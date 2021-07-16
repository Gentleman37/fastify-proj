import { app } from './app'

const PORT = 3000

const start = async () => {
  try {
    console.log(`👏 fastify server is listening on port:${PORT} 👏`)
    await app.listen(PORT)
  } catch (err) {
    app.log.error(err)
    process.exit(1)
  }
}

start()
