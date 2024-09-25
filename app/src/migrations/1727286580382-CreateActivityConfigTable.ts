import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateActivityConfigTable1727286580382 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'activity_config',
                columns: [
                    {
                        name: 'guild_id',
                        type: 'bigint',
                        isPrimary: true,
                        isNullable: false,
                        unsigned: true
                    },
                    {
                        name: 'log_channel',
                        type: 'bigint',
                        isNullable: true,
                        unsigned: true,
                        default: null
                    },
                    {
                        name: 'most_active_role',
                        type: 'bigint',
                        isNullable: true,
                        unsigned: true,
                        default: null
                    }
                ]
            }), true
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable('activity_config');
    }
}