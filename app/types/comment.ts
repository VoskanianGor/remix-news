import type Item from './item'

export default interface Comment extends Item {
	parent: number
	text: string
}
