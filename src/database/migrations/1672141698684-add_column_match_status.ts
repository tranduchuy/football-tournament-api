import { MigrationInterface, QueryRunner } from 'typeorm';

export class addColumnMatchStatus1672141698684 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `alter table matches add status varchar(255) default '' not null;`,
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`alter table matches drop column status`);
  }
}
