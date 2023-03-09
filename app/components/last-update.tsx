import { useState } from 'react'

import useInterval from '~/hooks/use-interval'
import getTimeAgo from '~/utils/get-time-ago'

interface LastUpdateProps {
	lastUpdate: number
}

export default function LastUpdate({ lastUpdate }: LastUpdateProps) {
	const [_, rerenderer] = useState(Date.now())

	useInterval(() => {
		rerenderer(Date.now())
	}, 1000)

	return (
		<div className="flex flex-col items-center mb-2">
			<h4 className="m-0 text-sm">Last update:</h4>
			<span className="text-sm opacity-75">{getTimeAgo(lastUpdate)}</span>
		</div>
	)
}
