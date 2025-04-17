import { FastifyInstance } from 'fastify'
import {initORM} from '../../db.js'
import { getUserFromToken } from '../common/utils.js'
import { wrap } from '@mikro-orm/core'
import { Article } from './article.entity.js'
import { User } from '../user/user.entity.js'

export async function registerArticleRoutes(app: FastifyInstance) {
  const db = await initORM()

  app.get('/', async (request) => {
    const { limit, offset } = request.query as { limit?: number; offset?: number}
    const [items, total] = await db.article.findAndCount({}, {
      limit, offset
    })

    return {items, total}
  })
  
  app.get('/:slug', async (request) =>  {
    const { slug } = request.params as { slug: string};

    return db.article.findOneOrFail({slug}, {
      populate: ['author', 'comments.author', 'text'],
    })
  })

  app.post('/:slug/comment', async request => {
    const { slug, text } = request.params as { slug: string; text: string };
    const author = getUserFromToken(request);
    const article = await db.article.findOneOrFail({ slug });
    const comment = db.comment.create({ author, article, text });

  // We can add the comment to `article.comments` collection,
  // but in fact it is a no-op, as it will be automatically
  // propagated by setting Comment.author property.
  // article.comments.add(comment);

    // mention we don't need to persist anything explicitly
    await db.em.flush();

    return comment;
  })

  app.post('/', async (request) => {
    const {title, description, text} = request.body as { title: string, description: string, text: string}

    const author = getUserFromToken(request)
    const article = db.article.create({
      title,
      description,
      text,
      author
    })

    await db.em.flush()
    return article
  })

  app.patch('/:id', async request => {
    const user = getUserFromToken(request)
    const params = request.params as {id: string}
    const article = await db.article.findOneOrFail(+params.id)
    
    verifyArticlePermissions(user, article)
    wrap(article).assign(request.body as Article)
    await db.em.flush()

    return article
  })
}

export function verifyArticlePermissions(user: User, article: Article): void {
  if (article.author.id !== user.id) {
    throw new Error('You are not the author of this article!');
  }
}

