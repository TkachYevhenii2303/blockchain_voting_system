import { ConfigService } from '@nestjs/config';
import { DataSource, DataSourceOptions } from 'typeorm';
import { SeederOptions } from 'typeorm-extension';

const configService = new ConfigService();

export const databaseOptions: DataSourceOptions & SeederOptions = {
  type: 'postgres',
  host: configService.get('DATABASE_HOST', 'localhost'),
  port: configService.get('DATABASE_PORT', 5432),
  username: configService.get('DATABASE_USERNAME', 'postgres'),
  password: configService.get('DATABASE_PASSWORD', 'password'),
  database: configService.get(
    'DATABASE_NAME',
    'blockchain_voting_system_stage',
  ),
  entities: ['dist/src/modules/**/*.entity{.ts,.js}'],
  migrations: ['dist/src/config/database/migrations/**/*{.ts,.js}'],
  migrationsTableName: 'migrations',
  migrationsRun: false,
  synchronize: false,
  logging: configService.get('NODE_ENV') === 'development',
};

const databaseSource = new DataSource(databaseOptions);
export default databaseSource;
