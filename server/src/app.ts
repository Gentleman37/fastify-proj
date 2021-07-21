import fastify from 'fastify'
import cors from 'fastify-cors'
import swagger from 'fastify-swagger'

import PostCheckBodySchema from './schemas/postCheck.body.json'
import { PostCheckBody } from './schema-types/postCheck.body'
import PostLogsBodySchema from './schemas/postLogs.body.json'
import { PostLogsBody } from './schema-types/postLogs.body'
import { FirehoseService } from './services'

const app = fastify({
  logger: {
    prettyPrint: {
      translateTime: true,
      ignore: 'pid,hostname,req,res,responseTime,reqId',
      messageFormat: '{req.method} {req.url} [{msg}]',
    },
  },
})

app.register(cors, {
  origin: '*',
})

if (process.env.NODE_ENV === 'dev') {
  app.register(swagger, {
    routePrefix: '/docs',
    exposeRoute: true,
  })
}

// GET /
app.get('/', async (req, reply) => {
  return 'good'
})

// GET /error
app.get('/error', async (req, reply) => {
  throw new Error('error')
})

// POST /logs
app.post<{ Body: PostLogsBody }>('/logs', { schema: PostLogsBodySchema, attachValidation: true }, async (req, reply) => {
  // console.log(req.body)
  if (req.validationError) {
    reply.code(400).send(req.validationError)
  }

  try {
    FirehoseService.putRecord(req.body)
  } catch (error) {
    reply.code(200).send({ message: 'bad' })
  }

  reply.code(200).send({ message: 'good' })
})

// POST /check
app.post<{ Body: PostCheckBody }>('/check', { schema: PostCheckBodySchema, attachValidation: true }, async (req, reply) => {
  console.log(req.body)
  if (req.validationError) {
    reply.code(400).send(req.validationError)
  }

  const { greeting, name } = req.body
  reply.code(200).send({ message: `Hello ${name}, ${greeting}` })
})

export { app }
