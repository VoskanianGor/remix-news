import type Item from './item'

export default interface News extends Item {
	title?: string
	url?: string
	score?: number
	descendants?: number
}
