export default async function getItem<T = any>(
	id: number | string
): Promise<T> {
	const res = await fetch(
		`https://hacker-news.firebaseio.com/v0/item/${id}.json?print=pretty`
	)

	return res.json()
}
