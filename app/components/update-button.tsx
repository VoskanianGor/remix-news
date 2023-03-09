import { UpdateIcon } from '@radix-ui/react-icons'

interface UpdateButtonProps {
	handler: VoidFunction
	isLoading: boolean
	title?: string
}

export default function UpdateButton({
	handler,
	isLoading,
	title,
}: UpdateButtonProps) {
	return (
		<button onClick={handler} disabled={isLoading} title={title ?? 'update'}>
			<UpdateIcon
				className={isLoading ? 'animate-spin text-orange-600' : ''}
				width={20}
				height={20}
			/>
		</button>
	)
}
