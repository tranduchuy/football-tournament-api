import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitDB1671934469550 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`
        create table if not exists hometest.teams
        (
            id   int auto_increment
                primary key,
            name varchar(255) unique not null,
            tournament_id int not null
        )
    `);

    await queryRunner.query(`create table if not exists hometest.tournaments
    (
        deleted_at datetime(6)                              null,
        created_at datetime(6) default CURRENT_TIMESTAMP(6) not null,
        updated_at datetime(6) default CURRENT_TIMESTAMP(6) not null on update CURRENT_TIMESTAMP(6),
        id         int auto_increment
            primary key,
        name       varchar(255)                             not null
    )`);

    await queryRunner.query(`create table if not exists hometest.matches
    (
        id              int auto_increment
            primary key,
        home_team_id    int           not null,
        away_team_id    int           not null,
        home_team_score int default 0 not null,
        away_team_score int default 0 not null,
        date            datetime      not null
    )`);

    await queryRunner.query(`alter table hometest.matches
    add constraint matches_home_team__fk
        foreign key (home_team_id) references teams (id)`);

    await queryRunner.query(`alter table hometest.matches
    add constraint matches_away_team__fk
        foreign key (away_team_id) references teams (id)`);

    await queryRunner.query(`alter table hometest.teams
    add constraint teams_belongs_to__fk
        foreign key (tournament_id) references tournaments (id)`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`drop table matches`);
    await queryRunner.query(`drop table teams`);
    await queryRunner.query(`drop table tournaments`);
  }
}