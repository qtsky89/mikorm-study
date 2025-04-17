import { FindOptions, sql, EntityRepository} from '@mikro-orm/sqlite'
import {Article} from './article.entity.js'
import { ArticleListing } from './article-listing.entity.js'

export class ArticleRepository extends EntityRepository<Article> {
  listArticlesQuery() {
    return this.createQueryBuilder('a')
  }

  async listArticles(options: FindOptions<ArticleListing>) {
    const [items, total] = await this.em.findAndCount(ArticleListing, {}, options)
    return {items, total}
  }
}