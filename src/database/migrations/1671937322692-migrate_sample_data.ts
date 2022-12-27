import { MigrationInterface, QueryRunner } from 'typeorm';
import * as fs from 'fs';
import * as path from 'path';

export class migrateSampleData1671937322692 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // read sql and execute it
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
    // remove all records
    await queryRunner.query('DELETE FROM matches');
    await queryRunner.query('DELETE FROM teams;');
    await queryRunner.query('DELETE FROM tournaments');
  }
}
