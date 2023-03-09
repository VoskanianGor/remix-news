export default function getTimeAgo(timestamp: number) {
	const now = Date.now()
	const diff = now - timestamp

	if (diff < 10000) {
		return 'a few seconds ago'
	} else if (diff < 60000) {
		return `${Math.floor(diff / 1000)} seconds ago`
	} else {
		return `${Math.floor(diff / 60000)} minutes ago`
	}
}
