import fastify from 'fastify'
import cors from 'fastify-cors'

import PostCheckBodySchema from './schemas/postCheck.body.json'
import { PostCheckBody } from './schema-types/postCheck.body'
import PostLogsBodySchema from './schemas/postLogs.body.json'
import { PostLogsBody } from './schema-types/postLogs.body'
import { FirehoseService } from './services'

const app = fastify()

app.register(cors, {
  origin: '*',
})

// GET /
app.get('/', async (req, reply) => {
  return 'good'
})

// POST /logs
app.post<{ Body: PostLogsBody }>('/logs', { schema: PostLogsBodySchema, attachValidation: true }, async (req, reply) => {
  if (req.validationError) {
    reply.code(400).send(req.validationError)
  }

  FirehoseService.putRecord(req.body)

  return 'good'
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
