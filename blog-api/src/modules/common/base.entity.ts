import { OptionalProps, PrimaryKey, Property } from "@mikro-orm/core";


export abstract class BaseEntity<Optional = never> {
  @PrimaryKey()
  id!: number;

  [OptionalProps]?: 'createdAt' | 'updatedAt' | Optional;
  
  @Property()
  createdAt = new Date();

  @Property({ onUpdate: () => new Date() })
  updatedAt = new Date();
}