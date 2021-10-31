import { fastify } from "fastify";
import { authController } from "@server/modules/auth";
import { staticController } from "@server/modules/static";
import { testController } from "@server/modules/test/controller";

export const server = fastify({ logger: true })

authController(server)
staticController(server)
testController(server)
