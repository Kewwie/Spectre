import { Entity, Column, PrimaryColumn } from "typeorm";

@Entity("activity_config")
export class ActivityConfigEntity {
    @PrimaryColumn({ name: "guild_id", type: 'bigint' })
    guildId: string;

    @Column({ name: "log_channel", type: 'bigint', nullable: true })
    logChannel: string;

    @Column({ name: "most_active_role", type: 'bigint', nullable: true })
    mostActiveRole: string;
}