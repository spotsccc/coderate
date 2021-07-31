import { authController } from "../modules/auth";
import { fastify } from "fastify";
import { staticController } from "../modules/static/controller";

export const server = fastify({ logger: true })

authController(server)
staticController(server)
