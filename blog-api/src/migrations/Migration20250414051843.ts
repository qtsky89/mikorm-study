import { Migration } from '@mikro-orm/migrations';

export class Migration20250414051843 extends Migration {

  override async up(): Promise<void> {
    this.addSql(`create table \`comment\` (\`id\` integer not null primary key autoincrement, \`created_at\` datetime not null, \`updated_at\` datetime not null, \`text\` text not null, \`article_id\` integer not null, \`author_id\` integer not null, constraint \`comment_article_id_foreign\` foreign key(\`article_id\`) references \`article\`(\`id\`) on update cascade, constraint \`comment_author_id_foreign\` foreign key(\`author_id\`) references \`user\`(\`id\`) on update cascade);`);
    this.addSql(`create index \`comment_article_id_index\` on \`comment\` (\`article_id\`);`);
    this.addSql(`create index \`comment_author_id_index\` on \`comment\` (\`author_id\`);`);
  }

}
