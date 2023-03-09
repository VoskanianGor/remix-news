import { StarFilledIcon } from '@radix-ui/react-icons'

interface ScoreBadgeProps {
	score?: number
}

export default function ScoreBadge({ score }: ScoreBadgeProps) {
	return (
		<div className="flex items-center gap-1 m-0">
			<StarFilledIcon className="text-yellow-400" />
			<code>{score ?? 0}</code>
		</div>
	)
}
