import { MigrationInterface, QueryRunner } from 'typeorm';
import * as fs from 'fs';
import * as path from 'path';

export class migrateSampleData1671937322692 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      fs.readFileSync(path.join(__dirname, 'data/tournaments.sql')).toString(),
    );

    await queryRunner.query(
      fs.readFileSync(path.join(__dirname, 'data/teams.sql')).toString(),
    );

    await queryRunner.query(
      fs.readFileSync(path.join(__dirname, 'data/matches.sql')).toString(),
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query('DELETE FROM hometest.matches');
    await queryRunner.query('DELETE FROM hometest.teams;');
    await queryRunner.query('DELETE FROM hometest.tournaments');
  }
}
