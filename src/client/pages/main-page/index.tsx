import { reflect } from '@effector/reflect'
import { createEffect, restore } from 'effector'
import React, { FC } from 'react'
import { test } from '@client/shared/api'
import { createStore } from 'effector'

type Props = {
	data?: string
}

const dataFx = createEffect(test)
const $data = createStore('').on(dataFx.doneData, (_, p) => p.data)

const View: FC<Props> = ({ data }) => <div>{data}</div>

export const MainPage = reflect({
	view: View,
	bind: { data: $data },
	hooks: {
		mounted: dataFx,
	},
})
