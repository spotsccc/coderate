import { createController, Method, Routes } from "@server/lib/controller";

const routes: Routes = [
	{
		path: 'bundle.js',
		method: Method.GET,
		handler: ctx => async () => ctx.rep.sendFile('bundle.js')
	},
]

export const staticController = createController({url: 'app'})(routes)
