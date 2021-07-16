import fastify from 'fastify'
// import Ajv from 'ajv'
import PostCheckBodySchema from './schemas/postCheck.body.json'
import { PostCheckBody } from './schema-types/postCheck.body'

// const ajv = new Ajv({
//   removeAdditional: true,
//   useDefaults: true,
//   coerceTypes: false,
//   allErrors: true,
// })

const app = fastify()

// app.setValidatorCompiler((schema) => ajv.compile(schema))

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
