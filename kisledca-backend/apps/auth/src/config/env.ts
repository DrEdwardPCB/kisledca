import { config } from "dotenv";
config();
import { cleanEnv, str, port, email } from "envalid";
export const env = cleanEnv(process.env, {
	NODE_ENV: str(),
	DB_TYPE: str(),
	DB_DATABASE: str(),
	DB_HOST: str(),
	DB_PORT: port(),
	DB_USERNAME: str(),
	DB_PASSWORD: str(),
	PORT: port(),
	JWT_SECRET: str(),
	TZ: str(),
	SUPERADMIN_EMAIL: email({ devDefault: "superadmin@gmail.com" }),
	SUPERADMIN_PASSWORD: str({ devDefault: "1234567890qwer" }),
});
