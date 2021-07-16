import { app } from './app'

const PORT = 5000
const ADDRESS = '0.0.0.0'

const start = async () => {
  try {
    console.log(`👏 fastify server is listening on port:${PORT} 👏`)
    await app.listen(PORT, ADDRESS)
  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }
}

start()
