import { Entity, Property } from "@mikro-orm/core";
import { BaseEntity } from "../common/base.entity.js";
// import { t } from '@mikro-orm/core'; // `t` or `types`

@Entity()
export class User extends BaseEntity{
  @Property()
  fullName!: string;

  @Property()
  email!: string;

  @Property()
  password!: string;

  @Property({type: 'text'})
  bio = '';

  // @Property({ type: t.text })
  // bio = '';

  // @Property({ columnType: 'character varying(1000)' })
  // bio = '';

  // @Property()
  // createdAt = new Date();

  // @Property({ onUpdate: () => new Date() })
  // updatedAt = new Date();
}