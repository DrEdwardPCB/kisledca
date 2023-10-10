import {
	Column,
	CreateDateColumn,
	DeleteDateColumn,
	Entity,
	JoinTable,
	ManyToMany,
	PrimaryGeneratedColumn,
	UpdateDateColumn,
} from "typeorm";
import { Group } from "./Group";
import { Role } from "./Role";
import { Permission } from "./Permission";

@Entity()
export class User {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column({ type: "varchar", length: 255, unique: true })
	email: string;

	@Column({ type: "varchar", length: 255 })
	password: string;

	@Column({ type: "boolean" })
	enabled: boolean;

	@CreateDateColumn()
	createdAt: string;

	@UpdateDateColumn()
	updatedAt: string;

	@DeleteDateColumn()
	expiredAt: string | null;

	@ManyToMany(() => Group, (group) => group.Users, {
		lazy: true,
	})
	@JoinTable()
	Groups: Promise<Group[]>;

	@ManyToMany(() => Role, (role) => role.Users, {
		lazy: true,
	})
	@JoinTable()
	Roles: Promise<Role[]>;

	@ManyToMany(() => Permission, (permission) => permission.Users, {
		lazy: true,
	})
	@JoinTable()
	Permissions: Promise<Permission[]>;
}
