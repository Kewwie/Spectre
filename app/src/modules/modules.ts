import { Module } from '@/types/module';

// Modules Imports
import { ConfigModule } from './config/module';
import { ActivityModule } from './activity/module';
import { DevModule } from './dev/module';
import { ListModule } from './list/module';
import { ModerationModule } from './moderation/module';
import { PersistModule } from './persist/module';
import { verificationModule } from './verification/module';

export const ClientModules: Module[] = [
	ConfigModule,
	ActivityModule,
	DevModule,
	ListModule,
	ModerationModule,
	PersistModule,
	verificationModule,
];
