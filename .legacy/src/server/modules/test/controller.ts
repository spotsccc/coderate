import { createController, Method } from "@server/lib/controller";
import { testHandler } from "./test";

const options = {
	url: 'api/test'
}

const routes = [
	{
		path: 'test',
		method: Method.GET,
		handler: testHandler,
	}
]

export const testController = createController(options)(routes)
