import { EntityRepository } from "@mikro-orm/sqlite";
import {User} from './user.entity.js'

export class UserRepository extends EntityRepository<User> {
  async exists(email: string) {
    const count = await this.count({email})
    return count > 0
  }
}