import { PersonIcon } from '@radix-ui/react-icons'

interface UserBadgeProps {
	username?: string
}

export default function UserBadge({ username }: UserBadgeProps) {
	return (
		<div className="flex items-center gap-2">
			<PersonIcon />
			<code>{username ?? 'unknown user'}</code>
		</div>
	)
}
