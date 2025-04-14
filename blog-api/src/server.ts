// import { MikroORM } from "@mikro-orm/sqlite"
// import { User } from "./modules/user/user.entity.js"
// import { Tag } from "./modules/user/tag.entity.js"

// const orm = await MikroORM.init()
// await orm.schema.refreshDatabase()

// const em = orm.em.fork()

// const user = new User('Foor bar', 'foo@bar.com', '123456');

// await em.persist(user).flush()

// console.log(`user id is: ${user.id}`)

// const userById = await em.findOne(User, 1)
// console.log('users are the same?', user === userById)

// const em2 = orm.em.fork()
// const userByEmail = await em2.findOneOrFail(User, {email: "foo@bar.com"})
// console.log('users are the same?', user === userByEmail)

// const allUser = await em.find(User, {})
// console.log(allUser)


// userByEmail.bio = 'changed'

// await em2.refresh(userByEmail)
// console.log("change are lost", userByEmail)

// userByEmail.bio = 'some change, will be saved';
// await em2.flush();

// console.log(userByEmail)

// // await em2.remove(userByEmail).flush()
// // const userRef = em2.getReference(User, 1);
// // await em2.remove(userRef).flush();


// import { LoadStrategy, wrap } from '@mikro-orm/core';
// import { Article } from "./modules/user/article.entity.js"

// const userRef = em.getReference(User, 1);
// console.log('userRef is initialized:', wrap(userRef).isInitialized());

// await wrap(userRef).init();
// console.log('userRef is initialized:', wrap(userRef).isInitialized());

// em2.clear()

// // const article = em2.create(Article, {
// //   slug: 'foo',
// //   title: 'FOO',
// //   text: 'Loren impsum dolor sit amet',
// //   description: 'Foo is bar',
// //   author: user.id
// // });

// const article = em2.create(Article, {
//   title: 'FOO is Bar',
//   text: 'Lorem impsum dolor sit amet',
//   author: user.id
// });

// await em2.flush()
// console.log(article)

// console.log('it really is a User', article.author instanceof User); // true
// console.log('but not initialized', wrap(article.author).isInitialized()); // false


// const articleWithAuthor = await em.findOne(Article, article.id, {populate: ['author', 'text']})
// console.log(articleWithAuthor)

// em.clear()

// const userx = await em.findOneOrFail(User, 1, { populate: ['articles']})
// console.log('userx: ', userx)
// if (!userx.articles.isInitialized()) {
//   await userx.articles.init();
// }
// await userx.articles.loadItems();
// console.log('userx: ', userx)

// for (const article of user.articles) {
//   console.log(article.title);
//   console.log(article.author.fullName); // the `article.author` is linked automatically thanks to the Identity Map
// }

// const [articlex] = userx.articles;
// const newTag = em.create(Tag, { name: 'new' });
// const oldTag = em.create(Tag, { name: 'old' });

// articlex.tags.add(newTag, oldTag);
// await em.flush();
// console.log(articlex.tags);

// await em.populate(articlex, ['tags'])
// //article.tags.remove(oldTag)
// articlex.tags.remove(t => t.id == oldTag.id)

// await em.flush()

// console.log(articlex.tags)

// await orm.close()


// https://mikro-orm.io/docs/guide/project-setup
import { bootstrap } from "./app.js";

try  {
  const {url} = await bootstrap()
  console.log(`server started at ${url}`)
} catch (e) {
  console.error(e)
}