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

