import { start } from './app'
import { server } from './app'

require('dotenv').config()

start(process.env)(server)().then((i) => i())
