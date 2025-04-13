import { Collection, Entity, ManyToMany, Property } from "@mikro-orm/core";
import { BaseEntity } from "../common/base.entity.js";
import { Article } from "./article.entity.js";

@Entity()
export class Tag extends BaseEntity {
  @Property({ length: 20})
  name!: string;

  @ManyToMany({ mappedBy: 'tags'})
  articles = new Collection<Article>(this)
}