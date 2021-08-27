import {
	ControllerOptions,
	createController,
	Routes,
	Method,
} from '@server/lib/controller'
import { signUp } from './sign-up'
import { login } from './login'

const controllerOptions: ControllerOptions = {
	url: 'api/auth',
}

const routes: Routes = [
	{
		path: 'login',
		method: Method.POST,
		handler: login,
	},
	{
		path: 'sign-up',
		method: Method.POST,
		handler: signUp,
	},
]

export const authController = createController(controllerOptions)(routes)
