import { Collection, Entity, ManyToMany, ManyToOne, OneToMany, OptionalProps, Property, t } from "@mikro-orm/core";
import { BaseEntity } from "../common/base.entity.js";
import { User } from "../user/user.entity.js";
import { Tag } from "../user/tag.entity.js";


function convertToSlug(text: string) {
  return text.toLowerCase()
             .replace(/[^\w ]+/g, '')
             .replace(/ +/g, '-');
}

/*
  I can do using Opt type to make it optional

  export class Article extends BaseEntity {

  @Property({ unique: true })
  slug: string & Opt;

  @Property({ length: 1000 })
  description: Opt<string>; // can be used via generics too

  // ...

}
*/
@Entity()
export class Article extends BaseEntity<'slug' | 'description'>{
  @Property({ unique: true})
  slug!: string;

  @Property({ index: true})
  title!: string;

  @Property({ length: 1000})
  description!: string;

  @Property({type: t.text, lazy: true})
  text!: string;

  @ManyToOne()
  author!: User;

  @ManyToMany({ inversedBy: 'articles' })
  tags = new Collection<Tag>(this)

  @OneToMany({ mappedBy: 'article', eager: true, orphanRemoval: true})
  comments = new Collection<Comment>(this)

  constructor(title: string, text: string, author: User) {
    super()
    this.title = title
    this.text = text
    this.author = author
    this.slug = convertToSlug(title)
    this.description = this.text.substring(0, 999) + '...'
  }
}