import { DataSource, DataSourceOptions } from "typeorm";
import { env } from "./env";
import { User } from "../database/entities/User";
import { Group } from "../database/entities/Group";
import { Role } from "../database/entities/Role";
import { Permission } from "../database/entities/Permission";

import { isNil } from "lodash";
export const baseOrmConfig: DataSourceOptions = {
	//@ts-ignore
	type: env.DB_TYPE,
	database: env.DB_DATABASE,
	host: env.DB_HOST,
	port: env.DB_PORT,
	username: env.DB_USERNAME,
	password: env.DB_PASSWORD,
	entities: [User, Group, Role, Permission],
	logging: true,
	synchronize: true,
};
export const AppDataSource = new DataSource(baseOrmConfig);
await AppDataSource.initialize();
