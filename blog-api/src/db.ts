import { EntityManager, EntityRepository, MikroORM, Options } from "@mikro-orm/sqlite"
import { Article } from "./modules/user/article.entity.js";
import { User } from "./modules/user/user.entity.js";
import { Tag } from "./modules/user/tag.entity.js";

export interface Services {
  orm: MikroORM;
  em: EntityManager;
  article: EntityRepository<Article>
  user: EntityRepository<User>
  tag: EntityRepository<Tag>
}

let cache: Services;

export async function initORM(options?: Options): Promise<Services> {
  if (cache) {
    return cache
  }

  const orm = await MikroORM.init(options)

  return cache = {
    orm,
    em: orm.em,
    article: orm.em.getRepository(Article),
    user: orm.em.getRepository(User),
    tag: orm.em.getRepository(Tag)
  }
}