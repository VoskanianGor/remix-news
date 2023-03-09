import type Comment from '~/types/comment'
import CommentItem from './comment-item'

interface CommentsListProps {
	comments: Comment[]
}

export default function CommentList({ comments }: CommentsListProps) {
	return (
		<ul className="list-none border-l">
			{comments.map(comment => (
				<CommentItem key={comment.id} comment={comment} />
			))}
		</ul>
	)
}
