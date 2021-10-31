export const throttle = <Args extends Array<unknown>>(
	fn: (...args: Args) => void,
	timeout: number,
) => {
	let lastTimeCall: number | null = null
	return (...args: Args) => {
		if (lastTimeCall === null || lastTimeCall + timeout < Date.now()) {
			lastTimeCall = Date.now()
			return fn(...args)
		}
		return null
	}
}
