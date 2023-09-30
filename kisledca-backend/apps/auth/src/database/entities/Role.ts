import {
	Column,
	DeleteDateColumn,
	Entity,
	JoinTable,
	ManyToMany,
	PrimaryGeneratedColumn,
} from "typeorm";
import { User } from "./User";
import { Permission } from "./Permission";
import { Group } from "./Group";

@Entity()
export class Role {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column({ type: "varchar", length: 255 })
	name: string;

	@Column({ type: "text" })
	description: string;

	@DeleteDateColumn()
	expiredAt: string | null;

	@ManyToMany(() => User, (user) => user.Roles)
	Users: User[];

	@ManyToMany(() => Permission, (permission) => permission.Roles, {
		lazy: true,
	})
	@JoinTable()
	Permissions: Promise<Permission[]>;

	@ManyToMany(() => Group, (group) => group.Roles, {
		lazy: true,
	})
	@JoinTable()
	Groups: Promise<Group[]>;
}
