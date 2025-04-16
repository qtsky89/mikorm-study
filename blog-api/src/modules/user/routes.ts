import { FastifyInstance } from 'fastify';
import { initORM } from '../../db.js';
import { EntityData, RequiredEntityData } from '@mikro-orm/core';
import { Social, User } from './user.entity.js';
import { getUserFromToken } from '../common/utils.js';
import { wrap } from '@mikro-orm/sqlite';

export async function registerUserRoutes(app: FastifyInstance) {
  const db = await initORM()

  app.post('/sign-up', async (request) => {
    const body = request.body as EntityData<User>

    if(!body.email || !body.fullName || !body.password) {
      throw new Error("One or required field is missing. email, fullName, password")
    }
    if (await db.user.exists(body.email) ) {
      throw new Error("This email is already registered, maybe you want to sign in?")
    }

    // const user = new User(body.fullName, body.email, body.password)
    // user.bio = body.bio ?? '';
    // user.social = body.social as Social

    const user = db.user.create(request.body as RequiredEntityData<User>)
    await db.em.persist(user).flush()
    user.token = app.jwt.sign({id: user.id})

    console.log(`User ${user.id} created`)

    return user
  })

  app.post('/sign-in', async (request) => {
    const { email, password} = request.body as {email: string, password: string} 
    const user = await db.user.login(email, password)
    user.token = app.jwt.sign({ id: user.id })

    return user
  })

  app.get('/profile', async (request) => {
    const user = getUserFromToken(request)
    return user
  })

  app.patch('profile', async (request)=> {
    const user = getUserFromToken(request);
    wrap(user).assign(request.body as User);
    await db.em.flush();
    return user;
  })
}