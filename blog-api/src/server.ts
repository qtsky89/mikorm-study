import { MikroORM } from "@mikro-orm/sqlite"
import { User } from "./modules/user/user.entity.js"


const orm = await MikroORM.init()
await orm.schema.refreshDatabase()

const em = orm.em.fork()

const user = new User();
user.email = "foo@bar.com"
user.fullName = "wonhee"
user.password = "12345"

await em.persist(user).flush()

console.log(`user id is: ${user.id}`)

const userById = await em.findOne(User, 1)
console.log('users are the same?', user === userById)

const em2 = orm.em.fork()
const userByEmail = await em2.findOneOrFail(User, {email: "foo@bar.com"})
console.log('users are the same?', user === userByEmail)

const allUser = await em.find(User, {})
console.log(allUser)


userByEmail.bio = 'changed'

await em2.refresh(userByEmail)
console.log("change are lost", userByEmail)

userByEmail.bio = 'some change, will be saved';
await em2.flush();

console.log(userByEmail)

// await em2.remove(userByEmail).flush()
// const userRef = em2.getReference(User, 1);
// await em2.remove(userRef).flush();


import { wrap } from '@mikro-orm/core';

const userRef = em.getReference(User, 1);
console.log('userRef is initialized:', wrap(userRef).isInitialized());

await wrap(userRef).init();
console.log('userRef is initialized:', wrap(userRef).isInitialized());


await orm.close()