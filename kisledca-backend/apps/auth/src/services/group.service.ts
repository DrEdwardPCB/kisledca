import { Inject, Service } from "typedi";
import { LogLevel, logAsync, useLogger } from "../utils/logDecorator";
import { logger } from "../logger";
import { CRUD } from "../utils/template/CRUD";
import { Group } from "../database/entities/Group";
import { EncryptCompareService } from "./encryptCompare.service";
import { isNil } from "lodash";
import { RoleService } from "./role.service";
import { NotFoundError } from "elysia";

@Service()
@useLogger({
	logger: logger,
	level: LogLevel.INFO,
	metadata: { class: "GroupService" },
})
export class GroupService extends CRUD<Group> {
	@Inject(() => RoleService)
	private rs: RoleService;
	constructor() {
		super(Group);
	}
	@logAsync({ name: "update" })
	async update(id: string, obj: Partial<Group>) {
		const old = await this.findOne({ where: { id } });
		const updated = Object.assign({}, old, obj);
		const result = await (await this.repo).save(updated);
		return result;
	}
	@logAsync({ name: "create" })
	async create(obj: Group | Partial<Group>) {
		return await (await this.repo).save(obj);
	}
	@logAsync({ name: "delete" })
	async delete(id: string) {
		await (await this.repo).softDelete(id);
	}
	@logAsync({ name: "associateRole" })
	async associateRole(groupid: string, roleid: string) {
		const group = await this.findOne({ where: { id: groupid } });
		const newRole = await this.rs.findOne({
			where: { id: roleid },
		});
		if (isNil(group) || isNil(newRole)) {
			throw new NotFoundError();
		}
		const existingRole = (await group.Roles) ?? [];
		existingRole.push(newRole);
		group.Roles = Promise.resolve(existingRole);
		return await (await this.repo).save(group);
	}
	@logAsync({ name: "dissociateRole" })
	async dissociateRole(groupid: string, roleid: string) {
		const group = await this.findOne({ where: { id: groupid } });
		if (isNil(group)) {
			throw new NotFoundError();
		}
		const existingRole = (await group.Roles) ?? [];
		const deletedRole = existingRole.filter((e) => e.id !== roleid);
		group.Roles = Promise.resolve(deletedRole);
		return await (await this.repo).save(group);
	}
}
