import { createEvent, sample } from 'effector'

import { addListenerFx, removeListenerFx } from './draggable'

export const widgetMounted = createEvent()
export const widgetUnmounted = createEvent()

sample({
	clock: widgetMounted,
	target: addListenerFx,
})

sample({
	clock: widgetUnmounted,
	target: removeListenerFx,
})
