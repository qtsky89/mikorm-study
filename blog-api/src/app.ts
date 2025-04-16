import { NotFoundError, RequestContext } from "@mikro-orm/core";
import { fastify } from 'fastify'
import { initORM } from "./db.js";
import { registerArticleRoutes } from "./modules/article/routes.js";
import { registerUserRoutes } from "./modules/user/routes.js";
import fastifyJWT from '@fastify/jwt'
import { AuthError } from "./modules/common/utils.js";


export async function bootstrap(port = 3001) {
  const db = await initORM()
  const app = fastify()

  app.addHook('onRequest', (request, reply, done) => {
    RequestContext.create(db.em, done)
  })

  app.addHook('onRequest', async (request) => {
    try {
      const ret = await request.jwtVerify<{id: number}>()
      request.user = await db.user.findOneOrFail(ret.id)
    } catch (e) {
      app.log.error(e)
    }
  })

  app.setErrorHandler((error, request, reply) => {
    if (error instanceof AuthError) {
      return reply.status(401).send({ error: error.message})
    }

    if (error instanceof NotFoundError) {
      return reply.status(404).send({ error: error.message})
    }

    app.log.error(error)
    reply.status(500).send({error: error.message})

  })


  app.addHook('onClose', async () => {
    await db.orm.close()
  })

  // routes
  app.register(registerArticleRoutes, { prefix: 'article' });
  app.register(registerUserRoutes, { prefix: 'user' });
  app.register(fastifyJWT, {
    secret: process.env.JWT_SECRET ?? '12345678' ,
  })


  const url = await app.listen({port});

  return {app, url}
}