import { defer } from '@remix-run/node'
import { Await, useLoaderData, useRevalidator } from '@remix-run/react'
import { Suspense, useState } from 'react'
import LastUpdate from '~/components/last-update'

import NewsList from '~/components/news-list'
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

			<hr />

			<Suspense fallback={<NewsListSkeleton />}>
				<Await resolve={news}>
					<NewsList isLoading={isLoading} />
				</Await>
			</Suspense>
		</div>
	)
}
