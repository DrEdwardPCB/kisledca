import Elysia, { ParseError, ValidationError } from "elysia";
import { AuthService } from "../services/auth.service";
import Container from "typedi";
import { Permission } from "../database/entities/Permission";
import { User } from "../database/entities/User";

// this jwt middleware parse the jwt into Partial User object and Permission array
export const JwtMiddleware = new Elysia().derive(
	async ({ request: { headers } }) => {
		try {
			const authorization = headers.get("Authorization");
			const as = Container.get(AuthService);
			const { user, permission } = (await as.decodeJwt(
				authorization?.replace("Bearer ", "") ?? ""
			)) as unknown as {
				user: Partial<User>;
				permission: { id: string; name: string }[];
			};
			return { user, permission };
		} catch (err) {
			return new ParseError("no JWT was found");
		}
	}
);
