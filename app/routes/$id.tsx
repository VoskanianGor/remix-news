import {
	ArrowLeftIcon,
	CalendarIcon,
	ExternalLinkIcon,
} from '@radix-ui/react-icons'
import type { LoaderArgs, MetaFunction } from '@remix-run/node'
import { json } from '@remix-run/node'
import { Link, useLoaderData, useRevalidator } from '@remix-run/react'
import clsx from 'clsx'
import Balancer from 'react-wrap-balancer'
import invariant from 'tiny-invariant'

import CommentList from '~/components/comment-list'
import DateBadge from '~/components/date-badge'
import UpdateButton from '~/components/update-button'
import UserBadge from '~/components/user-badge'
import getItem from '~/models/item'
import type Comment from '~/types/comment'
import type News from '~/types/news'

export const meta: MetaFunction<typeof loader> = ({ data }) => ({
	charset: 'utf-8',
	title: `RN | ${data.newsItem.title}`,
	viewport: 'width=device-width,initial-scale=1',
})

export async function loader({ params }: LoaderArgs) {
	const { id } = params

	invariant(id, 'id is required')

	const newsItem = await getItem<News>(id)
	const comments: Comment[] = await Promise.all(
		newsItem.kids?.map(getItem) ?? []
	)

	return json({ newsItem, comments })
}

export default function NewsPage() {
	const { newsItem, comments } = useLoaderData<typeof loader>()

	const revalidator = useRevalidator()
	const isLoading = revalidator.state === 'loading'

	return (
		<article className="prose prose-orange mx-auto">
			<Link
				to="/"
				className="flex items-center gap-1 uppercase text-lg no-underline mb-2 hover:text-orange-700 hover:gap-2 transition-all"
				prefetch="intent"
			>
				<ArrowLeftIcon width={20} height={20} />
				<span>back to news</span>
			</Link>

			<h1>
				<Balancer>{newsItem.title}</Balancer>
			</h1>

			<div className="flex justify-between items-end w-full">
				<div className="flex flex-col">
					<UserBadge username={newsItem.by} />
					<div className="flex items-center gap-2 text-sm">
						<CalendarIcon />
						<DateBadge time={newsItem.time} />
					</div>
				</div>

				{newsItem?.url && (
					<a
						className="flex items-center gap-1 mt-2 text-lg hover:text-orange-700 transition-colors"
						href={newsItem.url}
						target="_blank"
						rel="noreferrer"
					>
						Read article
						<ExternalLinkIcon width={19} height={19} />
					</a>
				)}
			</div>

			<hr />

			<div className="flex items-center justify-between">
				<h4 className="m-0">Comments ({comments.length}):</h4>
				<UpdateButton
					handler={revalidator.revalidate}
					isLoading={isLoading}
					title="update comments"
				/>
			</div>

			<div
				className={clsx(
					'transition-all duration-500',
					isLoading && 'pt-3 opacity-40'
				)}
			>
				{comments.length ? (
					<CommentList comments={comments} />
				) : (
					<div className="flex flex-col text-center text-sm mt-5">
						<span className="text-xl">👀</span>
						There is no comments yet
					</div>
				)}
			</div>
		</article>
	)
}
