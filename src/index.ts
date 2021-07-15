import fastify from 'fastify'

const server = fastify()

server.get('/', async (request, reply) => {
  console.log(reply)
  return { hello: 'world' }
})

const PORT = 3000

const start = async () => {
  try {
    console.log(`👏 fastify server is listening on port:${PORT} 👏`)
    await server.listen(PORT)
  } catch (err) {
    server.log.error(err)
    process.exit(1)
  }
}

start()
