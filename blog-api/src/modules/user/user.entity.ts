import { BeforeCreate, BeforeUpdate, Collection, Entity, EntityRepositoryType, EventArgs, OneToMany, Property } from "@mikro-orm/core";
import { BaseEntity } from "../common/base.entity.js";
// import { t } from '@mikro-orm/core'; // `t` or `types`
// import crypto from 'crypto';
import { Article } from "../article/article.entity.js";

import {hash, verify} from 'argon2'
import { UserRepository } from "./user.repository.js";

@Entity({ repository: () => UserRepository})
export class User extends BaseEntity<'bio'>{
  [EntityRepositoryType]?: UserRepository;
  
  @Property()
  fullName!: string;

  @Property()
  email!: string;

  @Property({hidden: true, lazy: true})
  password!: string;

  @Property({type: 'text'})
  bio = '';

  @Property({ persist: false})
  token?: string;

  @OneToMany({ mappedBy: 'author'})
  articles = new Collection<Article>(this)

  constructor(fullName: string, email: string, password: string) {
    super();
    this.fullName = fullName;
    this.email = email;
    this.password = password
  }

  @BeforeCreate()
  @BeforeUpdate()
  async hashPassword(args: EventArgs<User>) {
    const password = args.changeSet?.payload.password
    
    if (password) {
      this.password = await hash(password)
    }
  }

  async verifyPassword(password: string) {
    return verify(this.password, password);
  }

  // @Property({ type: t.text })
  // bio = '';

  // @Property({ columnType: 'character varying(1000)' })
  // bio = '';

  // @Property()
  // createdAt = new Date();

  // @Property({ onUpdate: () => new Date() })
  // updatedAt = new Date();
}