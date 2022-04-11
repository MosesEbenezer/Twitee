import {MigrationInterface, QueryRunner} from "typeorm";

export class migrationN21649655977273 implements MigrationInterface {
    name = 'migrationN21649655977273'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`twit\` ADD \`user_id\` int NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`twit\` ADD \`img_url\` varchar(255) NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`twit\` DROP COLUMN \`img_url\``);
        await queryRunner.query(`ALTER TABLE \`twit\` DROP COLUMN \`user_id\``);
    }

}
