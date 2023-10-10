import "reflect-metadata";
import { Inject, Service } from "typedi";
import { LogLevel, logAsync, useLogger } from "../utils/logDecorator";
import { logger } from "../logger";
import { CRUD } from "../utils/template/CRUD";
import { User } from "../database/entities/User";
import { EncryptCompareService } from "./encryptCompare.service";
import { forOwn, isNil, mapValues } from "lodash";
import { GroupService } from "./group.service";
import { RoleService } from "./role.service";
import { PermissionService } from "./permission.service";
import { NotFoundError } from "elysia";
import { Permission } from "../database/entities/Permission";

@Service()
@useLogger({
	logger: logger,
	level: LogLevel.INFO,
	metadata: { class: "UserService" },
})
export class UserService extends CRUD<User> {
	@Inject(() => EncryptCompareService)
	private ecs: EncryptCompareService;
	@Inject(() => GroupService)
	private gs: GroupService;
	@Inject(() => RoleService)
	private rs: RoleService;
	@Inject(() => PermissionService)
	private ps: PermissionService;
	constructor() {
		super(User);
	}

	@logAsync({ name: "update" })
	async update(id: string, obj: Partial<User>) {
		if (obj.password) {
			obj.password = await this.ecs.encrypt(obj.password);
		}
		const old = await this.findOne({ where: { id } });
		const updated = Object.assign({}, old, obj);
		const result = await (await this.repo).save(updated);
		return result;
	}

	@logAsync({ name: "create" })
	async create(obj: User | Partial<User>) {
		if (obj.password) {
			obj.password = await this.ecs.encrypt(obj.password);
		}
		return await (await this.repo).save(obj);
	}

	@logAsync({ name: "delete" })
	async delete(id: string) {
		await (await this.repo).softDelete(id);
	}

	@logAsync({ name: "associateRole" })
	async associateRole(userid: string, roleid: string) {
		const user = await this.findOne({ where: { id: userid } });
		const newRole = await this.rs.findOne({
			where: { id: roleid },
		});
		if (isNil(user) || isNil(newRole)) {
			throw new NotFoundError();
		}
		const existingRole = (await user.Roles) ?? [];
		existingRole.push(newRole);
		user.Roles = Promise.resolve(existingRole);
		return await (await this.repo).save(user);
	}

	@logAsync({ name: "associateGroup" })
	async associateGroup(userid: string, groupid: string) {
		const user = await this.findOne({ where: { id: userid } });
		const newGroup = await this.gs.findOne({
			where: { id: groupid },
		});
		if (isNil(user) || isNil(newGroup)) {
			throw new NotFoundError();
		}
		const existingGroup = (await user.Groups) ?? [];
		existingGroup.push(newGroup);
		user.Groups = Promise.resolve(existingGroup);
		return await (await this.repo).save(user);
	}
	@logAsync({ name: "associatePermission" })
	async associatePermission(userid: string, permissionid: string) {
		const user = await this.findOne({ where: { id: userid } });
		const newPermission = await this.ps.findOne({
			where: { id: permissionid },
		});
		if (isNil(user) || isNil(newPermission)) {
			throw new NotFoundError();
		}
		const existingPermission = (await user.Permissions) ?? [];
		existingPermission.push(newPermission);
		user.Permissions = Promise.resolve(existingPermission);
		return await (await this.repo).save(user);
	}
	@logAsync({ name: "associatePermission" })
	async dissociateRole(userid: string, roleid: string) {
		const user = await this.findOne({ where: { id: userid } });
		if (isNil(user)) {
			throw new NotFoundError();
		}
		const existingRole = (await user.Roles) ?? [];
		const deletedRole = existingRole.filter((e) => e.id !== roleid);
		user.Roles = Promise.resolve(deletedRole);
		return await (await this.repo).save(user);
	}
	async dissociateGroup(userid: string, groupid: string) {
		const user = await this.findOne({ where: { id: userid } });
		if (isNil(user)) {
			throw new NotFoundError();
		}
		const existingGroup = (await user.Groups) ?? [];
		const deletedGroup = existingGroup.filter((e) => e.id !== groupid);
		user.Groups = Promise.resolve(deletedGroup);
		return await (await this.repo).save(user);
	}
	async dissociatePermission(userid: string, permissionid: string) {
		const user = await this.findOne({ where: { id: userid } });
		if (isNil(user)) {
			throw new NotFoundError();
		}
		const existingPermission = (await user.Permissions) ?? [];
		const deletedPermission = existingPermission.filter(
			(e) => e.id !== permissionid
		);
		user.Permissions = Promise.resolve(deletedPermission);
		return await (await this.repo).save(user);
	}
}
