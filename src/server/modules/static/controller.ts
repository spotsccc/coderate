import { createController, Method, Routes } from "../../lib/controller";

const routes: Routes = [
	{
		path: 'bundle.js',
		method: Method.GET,
		handler: (_, rep) => {
			rep.sendFile('bundle.js')
		}
	},
	{
		path: '*',
		method: Method.GET,
		handler: (_, rep) => {
			rep.sendFile('index.html')
		}
	}
]

export const staticController = createController({url: 'app'})(routes)
