import { DataSource, DataSourceOptions } from 'typeorm';
import { config } from 'dotenv';
import { join} from "path"
config();

console.log(join(__dirname, './src/**/**.entity{.ts,.js}'))

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: process.env.DB_HOST,
  port: Number(process.env.DB_PORT),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
  entities: [join(__dirname, './src/**/**.entity{.ts,.js}')],
  migrations: ["dist/src/migrations/**.js"], 
  logging: false,
  synchronize: false,
};

const datasource = new DataSource(dataSourceOptions);

export default datasource;
