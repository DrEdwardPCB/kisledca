import { Inject, Service } from "typedi";
import { LogLevel, logAsync, useLogger } from "../utils/logDecorator";
import { logger } from "../logger";
import { CRUD } from "../utils/template/CRUD";
import { Role } from "../database/entities/Role";
import { EncryptCompareService } from "./encryptCompare.service";
import { forOwn, isNil, mapValues } from "lodash";
import { PermissionService } from "./permission.service";
import { NotFoundError } from "elysia";

@Service()
@useLogger({
	logger: logger,
	level: LogLevel.INFO,
	metadata: { class: "roleService" },
})
export class RoleService extends CRUD<Role> {
	@Inject(() => PermissionService)
	private ps: PermissionService;
	constructor() {
		super(Role);
	}
	@logAsync({ name: "update" })
	async update(id: string, obj: Partial<Role>) {
		const old = await this.findOne({ where: { id } });
		const updated = Object.assign({}, old, obj);
		const result = await (await this.repo).save(updated);
		return result;
	}
	@logAsync({ name: "create" })
	async create(obj: Role | Partial<Role>) {
		return await (await this.repo).save(obj);
	}
	@logAsync({ name: "delete" })
	async delete(id: string) {
		await (await this.repo).softDelete(id);
	}
	@logAsync({ name: "associatePermission" })
	async associatePermission(roleid: string, permissionid: string) {
		const role = await this.findOne({ where: { id: roleid } });
		const newPermission = await this.ps.findOne({
			where: { id: permissionid },
		});
		if (isNil(role) || isNil(newPermission)) {
			throw new NotFoundError();
		}
		const existingPermission = (await role.Permissions) ?? [];
		existingPermission.push(newPermission);
		role.Permissions = Promise.resolve(existingPermission);
		return await (await this.repo).save(role);
	}
	@logAsync({ name: "dissociatePermission" })
	async dissociatePermission(roleid: string, permissionid: string) {
		const role = await this.findOne({ where: { id: roleid } });
		if (isNil(role)) {
			throw new NotFoundError();
		}
		const existingPermission = (await role.Permissions) ?? [];
		const deletedPermission = existingPermission.filter(
			(e) => e.id !== permissionid
		);
		role.Permissions = Promise.resolve(deletedPermission);
		return await (await this.repo).save(role);
	}
}
