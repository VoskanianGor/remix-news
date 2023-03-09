import { format } from 'fecha'

interface DateBadgeProps {
	time: number
}

export default function DateBadge({ time }: DateBadgeProps) {
	return (
		<span className="text-sm text-slate-600 font-bold uppercase">
			{format(new Date(time * 1000), 'mediumDate')}
		</span>
	)
}
