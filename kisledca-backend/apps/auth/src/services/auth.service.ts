import { Inject, Service } from "typedi";
import { UserService } from "./user.service";
import { EncryptCompareService } from "./encryptCompare.service";
import { EncryptDecryptService } from "./encryptDecrypt.service";
import { JWTService } from "./jwt.service";
import { isNil, omit } from "lodash";
import { NotFoundError, ParseError, ValidationError } from "elysia";

@Service()
export class AuthService {
	@Inject(() => UserService)
	private us: UserService;
	@Inject(() => EncryptCompareService)
	private ecs: EncryptCompareService;
	@Inject(() => EncryptDecryptService)
	private eds: EncryptDecryptService;
	@Inject(() => JWTService)
	private js: JWTService;
	async login(payload: string) {
		// decrypt base64 encrypted password and username(email)
		// compare with internal database
		// return response
		// re
		const [email, password] = (await this.eds.decrypt(payload)).split(":");
		const queryUser = await this.us.findOne({
			where: {
				email: email,
			},
		});
		if (isNil(queryUser)) {
			throw new NotFoundError();
		}
		const directPermission = (await queryUser?.Permissions) ?? [];
		const nonFlatUserPermission = [directPermission];
		const roles = (await queryUser?.Roles) ?? [];
		const groups = (await queryUser?.Groups) ?? [];

		for (let group of groups) {
			let rolesInGroup = (await group.Roles) ?? [];
			rolesInGroup.forEach((e) => roles.push(e));
		}

		for (let role of roles) {
			let permissionOfRole = (await role.Permissions) ?? [];
			nonFlatUserPermission.push(permissionOfRole);
		}

		const user = omit(queryUser, [
			"Groups",
			"Permissions",
			"Roles",
			"Password",
		]);

		const permission = nonFlatUserPermission.flatMap((e) =>
			e.map((f) => ({ id: f.id, name: f.name }))
		);

		const passwordVerified = await this.ecs.compare(
			password,
			queryUser.password
		);

		if (!passwordVerified) {
			throw new ParseError("password does not match");
		}

		const jwt = await this.js.sign({ user, permission });

		return { jwt, user };
	}
	async decodeJwt(jwt: string) {
		const result = await this.js.verify(jwt);
		console.log(result);
		return result;
	}
}
