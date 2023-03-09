import { DotFilledIcon } from '@radix-ui/react-icons'

export default function NewsListSkeleton() {
	return (
		<div className="mt-5 space-y-3 animate-pulse">
			{[...Array(20)].map((_, i) => (
				<li key={i} className="flex flex-col gap-2">
					<div className="w-[60ch] h-4 bg-gray-200 rounded-md dark:bg-gray-700" />
					<div className="flex">
						<div className="w-[5ch] h-4 bg-gray-200 rounded-md dark:bg-gray-700" />
						<DotFilledIcon />
						<div className="w-[17ch] h-4 bg-gray-200 rounded-md dark:bg-gray-700" />
						<DotFilledIcon />
						<div className="w-[8ch] h-4 bg-gray-200 rounded-md dark:bg-gray-700" />
					</div>
				</li>
			))}
		</div>
	)
}
