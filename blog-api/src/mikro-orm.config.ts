import { defineConfig, GeneratedCacheAdapter, Options } from '@mikro-orm/sqlite';
import { TsMorphMetadataProvider } from '@mikro-orm/reflection';
import {SeedManager} from '@mikro-orm/seeder'
import { Migrator } from '@mikro-orm/migrations';
import { existsSync, readFileSync } from 'node:fs';

const options = {} as Options;
if (process.env.NODE_ENV === 'production' && existsSync('./temp/metadata.json')) {
  options.metadataCache = {
    enabled: true,
    adapter: GeneratedCacheAdapter,
    // temp/metadata.json can be generated via `npx mikro-orm-esm cache:generate --combine`
    options: {
      data: JSON.parse(readFileSync('./temp/metadata.json', { encoding: 'utf8' })),
    },
  };
} else {
  options.metadataProvider = (await import('@mikro-orm/reflection')).TsMorphMetadataProvider;
}

// no need to specify the `driver` now, it will be inferred automatically
export default defineConfig({
  dbName: 'sqlite.db',
  // folder-based discovery setup, using common filename suffix
  entities: ['dist/**/*.entity.js'],
  entitiesTs: ['src/**/*.entity.ts'],
  // we will use the ts-morph reflection, an alternative to the default reflect-metadata provider
  // check the documentation for their differences: https://mikro-orm.io/docs/metadata-providers
  metadataProvider: TsMorphMetadataProvider,
  // enable debug mode to log SQL queries and discovery information
  debug: true,
  dynamicImportProvider: (id) => import(id),
  extensions: [SeedManager, Migrator],
  ...options
});