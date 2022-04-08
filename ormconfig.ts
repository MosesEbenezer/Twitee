import { join } from 'path';
import { EnvService } from './src/common/env.service';
import { DataSourceOptions } from 'typeorm';

const config = new EnvService().read();

const connectionOptions: DataSourceOptions = {
  type: 'mysql',
  host: config.DB_HOST,
  port: config.DB_PORT,
  username: config.DB_USERNAME,
  password: config.DB_PASSWORD,
  database: config.DB_NAME,
  entities: [join(__dirname, '**', '*.entity.{ts,js}')],
  synchronize: false,
  dropSchema: false,
  migrationsRun: false,
  logging: ['warn', 'error'],
  migrations: [join(__dirname, 'src/migrations/*{.ts,.js}')],
  // cli: {
  //   migrationsDir: 'src/migrations',
  // },
};
console.log('ENV orm.ts', process.env.DB_PASSWORD);
export = connectionOptions;
