import { MigrationInterface, QueryRunner, Table } from 'typeorm';

export class CreateVerificationTables1733824110247
	implements MigrationInterface
{
	public async up(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.createTable(
			new Table({
				name: 'verification_config',
				columns: [
					{
						name: 'guild_id',
						type: 'bigint',
						isPrimary: true,
						isNullable: false,
						unsigned: true,
					},
					{
						name: 'log_channel',
						type: 'bigint',
						isNullable: true,
						unsigned: true,
						default: null,
					},
					{
						name: 'pending_channel',
						type: 'bigint',
						isNullable: true,
						unsigned: true,
						default: null,
					},
				],
			}),
			true
		);

		await queryRunner.createTable(
			new Table({
				name: 'verification_config_pings',
				columns: [
					{
						name: 'id',
						type: 'bigint',
						isPrimary: true,
						isGenerated: true,
						generationStrategy: 'increment',
					},
					{
						name: 'guild_id',
						type: 'bigint',
						isNullable: false,
						unsigned: true,
					},
					{
						name: 'role_id',
						type: 'bigint',
						isNullable: false,
						unsigned: true,
					},
				],
				foreignKeys: [
					{
						columnNames: ['guild_id'],
						referencedTableName: 'verification_config',
						referencedColumnNames: ['guild_id'],
						onDelete: 'CASCADE',
					},
				],
			}),
			true
		);

		await queryRunner.createTable(
			new Table({
				name: 'verification_config_roles',
				columns: [
					{
						name: 'id',
						type: 'bigint',
						isPrimary: true,
						isGenerated: true,
						generationStrategy: 'increment',
					},
					{
						name: 'guild_id',
						type: 'bigint',
						isNullable: false,
						unsigned: true,
					},
					{
						name: 'role_id',
						type: 'bigint',
						isNullable: false,
						unsigned: true,
					},
				],
				foreignKeys: [
					{
						columnNames: ['guild_id'],
						referencedTableName: 'verification_config',
						referencedColumnNames: ['guild_id'],
						onDelete: 'CASCADE',
					},
				],
			}),
			true
		);

		await queryRunner.createTable(
			new Table({
				name: 'verification_pending_messages',
				columns: [
					{
						name: 'guild_id',
						type: 'bigint',
						isPrimary: true,
						isNullable: false,
						unsigned: true,
					},
					{
						name: 'user_id',
						type: 'bigint',
						isPrimary: true,
						isNullable: false,
						unsigned: true,
					},
					{
						name: 'message_id',
						type: 'bigint',
						isNullable: false,
						unsigned: true,
					},
					{
						name: 'created_at',
						type: 'timestamp',
						isNullable: false,
						default: 'CURRENT_TIMESTAMP',
					},
				],
			}),
			true
		);
	}

	public async down(queryRunner: QueryRunner): Promise<void> {
		await queryRunner.dropTable('verification_config_pings', true);
		await queryRunner.dropTable('verification_config_roles', true);
		await queryRunner.dropTable('verification_config', true);
		await queryRunner.dropTable('verification_pending_messages', true);
	}
}
