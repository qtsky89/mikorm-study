import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
// import { t } from '@mikro-orm/core'; // `t` or `types`

@Entity()
export class User {
  @PrimaryKey()
  id!: number;

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
}