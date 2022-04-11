import {MigrationInterface, QueryRunner} from "typeorm";

export class migrationN31649671595302 implements MigrationInterface {
    name = 'migrationN31649671595302'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`like\` DROP COLUMN \`like\``);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`like\` ADD \`like\` int NOT NULL`);
    }

}
