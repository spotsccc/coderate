import nextRouter from 'next/router'
import { createEffect } from 'effector'

const pushFx = createEffect(nextRouter.push)

export const Navigation = { pushFx }
