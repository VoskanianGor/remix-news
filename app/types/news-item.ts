import type Item from './item'

export default interface NewsItem extends Item {
	title?: string
	url?: string
	score?: number
	descendants?: number
}
