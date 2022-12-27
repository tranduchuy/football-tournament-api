import { MigrationInterface, QueryRunner } from 'typeorm';

export class InitDB1671934469550 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    // `teams` table
    await queryRunner.query(`
        create table if not exists teams
        (
            id   int auto_increment
                primary key,
            name varchar(255) unique not null,
            tournament_id int not null
        )
    `);

    // `tournaments` table
    await queryRunner.query(`create table if not exists tournaments
    (
        deleted_at datetime(6)                              null,
        created_at datetime(6) default CURRENT_TIMESTAMP(6) not null,
        updated_at datetime(6) default CURRENT_TIMESTAMP(6) not null on update CURRENT_TIMESTAMP(6),
        id         int auto_increment
            primary key,
        name       varchar(255)                             not null
    )`);

    // `matches` table
    await queryRunner.query(`create table if not exists matches
    (
        id              int auto_increment
            primary key,
        home_team_id    int           not null,
        away_team_id    int           not null,
        home_team_score int default 0 not null,
        away_team_score int default 0 not null,
        date            datetime      not null
    )`);

    // add foreign key constrains `home_team_id` to `matches`
    await queryRunner.query(`alter table matches
    add constraint matches_home_team__fk
        foreign key (home_team_id) references teams (id)`);

    // add foreign key constrains `away_team_id` to `matches`
    await queryRunner.query(`alter table matches
    add constraint matches_away_team__fk
        foreign key (away_team_id) references teams (id)`);

    // add foreign key constrains `tournament_id` to `teams`
    await queryRunner.query(`alter table teams
    add constraint teams_belongs_to__fk
        foreign key (tournament_id) references tournaments (id)`);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(`drop table matches`);
    await queryRunner.query(`drop table teams`);
    await queryRunner.query(`drop table tournaments`);
  }
}
