import { DotFilledIcon } from '@radix-ui/react-icons'
import { Link } from '@remix-run/react'

import type News from '~/types/news'
import DateBadge from './date-badge'
import ScoreBadge from './score-badge'
import UserBadge from './user-badge'

interface NewsItemProps {
	newsItem: News
}

export default function NewsItem({ newsItem }: NewsItemProps) {
	return (
		<li className="flex flex-col gap-1">
			<Link className="m-0" to={newsItem.id.toString()} prefetch="intent">
				{newsItem.title}
			</Link>

			<div className="flex items-center m-0">
				<ScoreBadge score={newsItem.score} />
				<DotFilledIcon className="mx-1" />
				<UserBadge username={newsItem.by} />
				<DotFilledIcon className="mx-1" />
				<DateBadge time={newsItem.time} />
			</div>
		</li>
	)
}
