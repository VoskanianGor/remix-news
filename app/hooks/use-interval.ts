import { useEffect, useRef } from 'react'

export default function useInterval(
	callback: VoidFunction,
	delay: number | null
) {
	const savedCallback = useRef<VoidFunction>()

	useEffect(() => {
		savedCallback.current = callback
	})

	useEffect(() => {
		function tick() {
			savedCallback.current?.()
		}

		if (delay !== null) {
			let id = setInterval(tick, delay)
			return () => clearInterval(id)
		}
	}, [delay])
}
