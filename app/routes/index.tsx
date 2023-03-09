import { defer } from '@remix-run/node'
import { Await, useLoaderData, useRevalidator } from '@remix-run/react'
import clsx from 'clsx'
import { Suspense, useState } from 'react'
import LastUpdate from '~/components/last-update'

import NewsItem from '~/components/news-item'
import NewsListSkeleton from '~/components/skeleton/news-list'
import UpdateButton from '~/components/update-button'
import useInterval from '~/hooks/use-interval'
import getLatestNews from '~/models/news.server'

export function loader() {
	const news = getLatestNews(100)

	return defer({
		news,
	})
}

export default function Index() {
	const { news } = useLoaderData<typeof loader>()
	const [lastUpdate, setLastUpdate] = useState(Date.now())

	const revalidator = useRevalidator()
	const isLoading = revalidator.state === 'loading'

	const handleUpdate = () => {
		setLastUpdate(Date.now())
		revalidator.revalidate()
	}

	useInterval(handleUpdate, isLoading ? null : 1000 * 60)

	return (
		<div className="prose prose-orange max-w-none">
			<h1 className="italic text-center">⚡ Remix-News</h1>

			<LastUpdate lastUpdate={lastUpdate} />

			<div className="flex items-center justify-center">
				<UpdateButton
					handler={handleUpdate}
					isLoading={isLoading}
					title="update news"
				/>
			</div>

			<Suspense fallback={<NewsListSkeleton />}>
				<Await resolve={news}>
					{resolvedNews => (
						<ul
							className={clsx(
								'w-fit mx-auto p-0 flex flex-col gap-4 list-none transition-all duration-300',
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
