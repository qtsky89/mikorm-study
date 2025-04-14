import { bootstrap } from '../src/app.js'
import { initORM } from '../src/db.js'
import config from '../src/mikro-orm.config.js'
import { TestSeeder } from '../src/seeders/TestSeeder.js';

export async function initTestApp(port: number) {
  const { orm } = await initORM({
    ...config,
    debug: false,
    dbName: ":memory:",
  })

  await orm.schema.createSchema()
  await orm.seeder.seed(TestSeeder);

  const {app} = await bootstrap(port)

  return app
}