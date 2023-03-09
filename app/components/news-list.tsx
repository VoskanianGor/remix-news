import { DotFilledIcon } from '@radix-ui/react-icons'
import clsx from 'clsx'
import { useAsyncValue } from 'react-router-dom'
import type { loader } from '~/routes'
import NewsItem from './news-item'

interface NewsListProps {
	isLoading: boolean
}

export default function NewsList({ isLoading }: NewsListProps) {
	const news = useAsyncValue() as Awaited<
		ReturnType<typeof loader>['data']['news']
	>

	return (
		<ul
			className={clsx(
				'w-fit mx-auto p-0 flex flex-col gap-4 list-none transition-all duration-300',
				isLoading && 'pt-3 opacity-40'
			)}
		>
			{news?.map(item => (
				<NewsItem key={item.id} newsItem={item} />
			))}
		</ul>
	)
}
