import { DataSource, DataSourceOptions, getMetadataArgsStorage } from "typeorm";
import { SeederOptions } from 'typeorm-extension';
import config from "./config";
import InitSeeder from '../database/seeders/init.seeder';
import UserSeeder from "../database/seeders/user_seeder";
import User from "../database/entities/user";
import BasicEntity from "../database/entities/base_entity";
import UserAuthToken from "../database/entities/user_authorization_token";

const options: DataSourceOptions & SeederOptions = {
    type: 'postgres',
    host: config.POSTGRES_HOST,
    port: config.POSTGRES_PORT,
    username: config.POSTGRES_USERNAME,
    password: config.POSTGRES_PASSWORD,
    database: config.POSTGRES_DB,
    synchronize: false,
    logging: true,
    entities: [BasicEntity, User, UserAuthToken],
    migrations: [
        'src/database/migrations/*.ts',
    ],
    seeds: [
        //InitSeeder
        UserSeeder,
    ],
};

export default new DataSource(options);
