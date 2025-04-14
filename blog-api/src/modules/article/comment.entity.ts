import { Entity, ManyToOne, Property } from "@mikro-orm/core";
import { BaseEntity } from "../common/base.entity.js";
import { Article } from "./article.entity.js";
import { User } from "../user/user.entity.js";

@Entity()
export class Comment extends BaseEntity {
  @Property({length: 1000})
  text!: string;

  @ManyToOne()
  article!: Article;

  @ManyToOne()
  author!: User
}