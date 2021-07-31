import { ControllerOptions, createController, Routes, Method } from '../../lib/controller'

const controllerOptions: ControllerOptions = {
	url: 'api/auth',
}

const routes: Routes = [
	{
		path: 'login',
		method: Method.POST,
		handler: async () => {
			return 'hello world'
		}
	},
	{
		path: 'sign-up',
		method: Method.POST,
		handler: () => {}
	},
]

export const authController = createController(controllerOptions)(routes)
