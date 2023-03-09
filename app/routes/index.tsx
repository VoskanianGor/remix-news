import { defer, json } from '@remix-run/node'
import { Await, useLoaderData, useRevalidator } from '@remix-run/react'
import clsx from 'clsx'
import { Suspense } from 'react'

import NewsItem from '~/components/news-item'
import NewsListSkeleton from '~/components/skeleton/news-list'
import UpdateButton from '~/components/update-button'
import getLatestNews from '~/models/news.server'

export function loader() {
	const news = getLatestNews(100)

	// return json({ news })
	return defer({
		news,
	})
}

export default function Index() {
	const { news } = useLoaderData<typeof loader>()

	const revalidator = useRevalidator()
	const isLoading = revalidator.state === 'loading'

	return (
		<div className="prose prose-orange max-w-none">
			<h1 className="italic text-center">⚡ Remix-News</h1>

			<div className="flex items-center justify-center">
				<UpdateButton
					handler={revalidator.revalidate}
					isLoading={isLoading}
					title="update news"
				/>
			</div>

			<Suspense fallback={<NewsListSkeleton />}>
				<Await resolve={news}>
					{resolvedNews => (
						<ul
							className={clsx(
								'mx-auto p-0 flex flex-col gap-4 list-none transition-all duration-300',
								isLoading && 'pt-3 opacity-40'
							)}
						>
							{resolvedNews?.map(item => (
								<NewsItem key={item.id} newsItem={item} />
							))}
						</ul>
					)}
				</Await>
			</Suspense>
		</div>
	)
}
