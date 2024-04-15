import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateWhitelist1713179253876 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "whitelist",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment"
                    },
                    {
                        name: "guildId",
                        type: "varchar",
                    },
                    {
                        name: "userId",
                        type: "varchar",
                    },
                    {
                        name: "username",
                        type: "varchar",
                    },
                    {
                        name: "level",
                        type: "varchar",
                    },
                    {
                        name: "createdBy",
                        type: "varchar",
                    }
                ]
            })
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("whitelist");
    }

}