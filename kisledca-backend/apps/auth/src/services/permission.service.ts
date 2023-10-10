import { Service } from "typedi";
import { LogLevel, logAsync, useLogger } from "../utils/logDecorator";
import { logger } from "../logger";
import { CRUD } from "../utils/template/CRUD";
import { Permission } from "../database/entities/Permission";

@Service()
@useLogger({
	logger: logger,
	level: LogLevel.INFO,
	metadata: { class: "PermissionService" },
})
export class PermissionService extends CRUD<Permission> {
	constructor() {
		super(Permission);
	}
	@logAsync({ name: "update" })
	async update(id: string, obj: Partial<Permission>) {
		const old = await this.findOne({ where: { id } });
		const updated = Object.assign({}, old, obj);
		const result = await (await this.repo).save(updated);
		return result;
	}

	@logAsync({ name: "create" })
	async create(obj: Permission | Partial<Permission>) {
		return await (await this.repo).save(obj);
	}

	@logAsync({ name: "delete" })
	async delete(id: string) {
		await (await this.repo).softDelete(id);
	}
}
