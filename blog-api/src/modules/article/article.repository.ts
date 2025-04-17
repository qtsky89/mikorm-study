import { FindOptions, sql, EntityRepository} from '@mikro-orm/sqlite'
import {Article} from './article.entity.js'
import { ArticleListing } from './article-listing.entity.js'
import { Comment } from './comment.entity.js';

export class ArticleRepository extends EntityRepository<Article> {
  listArticlesQuery() {

    const totalComments = this.em.createQueryBuilder(Comment)
    .count()
    .where({article: sql.ref('a.id')})
    .as('totalComments')

    const usedTags = this.em.createQueryBuilder(Article, 'aa')
    .select(sql`group_concat(distinct t.name)`)
    .join('aa.tags', 't')
    .where({ 'aa.id': sql.ref('a.id') })
    .groupBy('aa.author')
    .as('tags');

    return this.createQueryBuilder('a')
    .select(['slug', 'title', 'description', 'author'])
    .addSelect(sql.ref('u.full_name').as('authorName'))
    .join('author', 'u')
    .addSelect([totalComments, usedTags]);
  }

  async listArticles(options: FindOptions<ArticleListing>) {
    const [items, total] = await this.em.findAndCount(ArticleListing, {}, options)

    return {items, total}
  }
}