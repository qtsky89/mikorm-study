import { RequestContext } from "@mikro-orm/core";
import { fastify } from 'fastify'
import { initORM } from "./db.js";


export async function bootstrap(port = 3001) {
  const db = await initORM()
  const app = fastify()

  app.addHook('onRequest', (request, reply, done) => {
    RequestContext.create(db.em, done)
  })

  app.addHook('onClose', async () => {
    await db.orm.close()
  })

  // routes
  app.get('/article', async (request) => {
    const { limit, offset } = request.query as { limit ?: number; offset ?: number}
    const [items, total] = await db.article.findAndCount({}, {limit, offset});

    return {items, total}
  })



  const url = await app.listen({port});

  return {app, url}
}