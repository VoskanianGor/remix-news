import { useAutoAnimate } from '@formkit/auto-animate/react'
import { CaretDownIcon, DotIcon, UpdateIcon } from '@radix-ui/react-icons'
import { useState } from 'react'

import getItem from '~/models/item'
import type Comment from '~/types/comment'
import CommentList from './comment-list'
import DateBadge from './date-badge'
import UserBadge from './user-badge'

interface CommentItemProps {
	comment: Comment
}

export default function CommentItem({ comment }: CommentItemProps) {
	const [animateParent] = useAutoAnimate()
	const [replies, setReplies] = useState<Comment[]>()
	const [showReplies, setShowReplies] = useState(false)
	const [isLoading, setIsLoading] = useState(false)

	const handleReplies = async () => {
		if (showReplies) {
			setShowReplies(false)

			return
		}

		setIsLoading(true)

		const response = await Promise.all(comment.kids?.map(getItem) ?? [])

		setReplies(response)
		setShowReplies(!showReplies)
		setIsLoading(false)
	}

	if (!comment.by || comment.dead) {
		return null
	}

	return (
		<li ref={animateParent} className="w-full mb-6">
			<div className="flex items-center">
				<UserBadge username={comment.by} />
				<DotIcon className="mx-1" />
				<DateBadge time={comment.time} />
			</div>

			<p dangerouslySetInnerHTML={{ __html: comment?.text }} />

			{comment?.kids?.length && (
				<button
					className="flex gap-1 items-center text-orange-600 italic font-bold text-sm whitespace-nowrap"
					onClick={handleReplies}
					disabled={isLoading}
				>
					{showReplies ? 'hide' : 'show'} replies
					{isLoading ? (
						<UpdateIcon className="animate-spin" />
					) : (
						<CaretDownIcon className={showReplies ? 'rotate-180' : ''} />
					)}
				</button>
			)}

			{replies?.length && showReplies && <CommentList comments={replies} />}
		</li>
	)
}
