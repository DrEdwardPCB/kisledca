import {
	FindManyOptions,
	FindOneOptions,
	Repository,
	Entity,
	EntityTarget,
	ObjectLiteral,
} from "typeorm";
import { AppDataSource } from "../../config/ormconfig";

export abstract class CRUD<T extends ObjectLiteral> {
	protected ads = AppDataSource;
	protected repo: Promise<Repository<T>>;
	constructor(entity: EntityTarget<T>) {
		if (!this.ads.isInitialized) {
			this.repo = new Promise((resolve, _) => {
				this.ads.initialize().then(() => {
					resolve(this.ads.getRepository(entity));
				});
			});
		} else {
			this.repo = new Promise((resolve, _) => {
				resolve(this.ads.getRepository(entity));
			});
		}
	}

	public async find(options: FindManyOptions<T>): Promise<T[]> {
		return await (await this.repo).find(options);
	}
	public async findOne(options: FindOneOptions<T>): Promise<T | null> {
		return await (await this.repo).findOne(options);
	}
	public abstract create(
		obj: Partial<T> | Record<string, any>
	): Promise<T | Partial<T>>;
	public abstract update(
		id: string,
		obj: Partial<T>
	): Promise<T | Partial<T>>;
	public abstract delete(id: string): Promise<void>;
}
