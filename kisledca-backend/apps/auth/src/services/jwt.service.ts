import { Service } from "typedi";
import { env } from "../config/env";
import * as jose from "jose";
import { LogLevel, log, useLogger } from "../utils/logDecorator";
import { logger } from "../logger";
@Service()
@useLogger({ logger: logger, level: LogLevel.INFO })
export class JWTService {
	constructor(private key: string = env.JWT_SECRET) {}

	@log({ name: "sign" })
	public async sign(payload: any) {
		const jwt = await new jose.SignJWT(payload)
			.setProtectedHeader({ alg: "HS256" })
			.setExpirationTime("24h")
			.sign(new TextEncoder().encode(this.key));

		return jwt;
	}
	@log({ name: "verify" })
	public async verify(jwt: string) {
		try {
			const decoded = await jose.jwtVerify(
				jwt,
				new TextEncoder().encode(this.key)
			);
			// console.log(decoded);
			return decoded.payload;
		} catch (err) {
			return false;
		}
	}
}
