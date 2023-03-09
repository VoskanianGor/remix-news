export default interface Item {
	id: number
	type: ItemTypes
	time: number
	by?: string
	kids?: number[]
	dead?: boolean
	deleted?: boolean
}

type ItemTypes = 'job' | 'story' | 'comment' | 'poll' | 'pollopt'
