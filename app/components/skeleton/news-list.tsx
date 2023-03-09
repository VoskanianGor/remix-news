import { DotFilledIcon } from '@radix-ui/react-icons'

export default function NewsListSkeleton() {
	return (
		<ul className="md:w-[570px] w-full mx-auto p-0 flex flex-col gap-4 list-none animate-pulse">
			{[...Array(20)].map((_, i) => (
				<li key={i} className="flex flex-col gap-1 p-0">
					<div className="max-w-[60ch] w-full h-4 my-2 bg-gray-200 rounded-md m-0" />
					<div className="flex m-0">
						<div className="max-w-[5ch] w-full h-4 bg-gray-200 rounded-md" />
						<DotFilledIcon />
						<div className="max-w-[13ch] w-full h-4 bg-gray-200 rounded-md" />
						<DotFilledIcon />
						<div className="max-w-[8ch] w-full h-4 bg-gray-200 rounded-md" />
					</div>
				</li>
			))}
		</ul>
	)
}
