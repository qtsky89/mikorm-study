import { RequestContext } from "@mikro-orm/core";
import { fastify } from 'fastify'
import { initORM } from "./db.js";
import { registerArticleRoutes } from "./modules/article/routes.js";
import { registerUserRoutes } from "./modules/user/routes.js";


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
  app.register(registerArticleRoutes, { prefix: 'article' });
  app.register(registerUserRoutes, { prefix: 'user' });


  const url = await app.listen({port});

  return {app, url}
}