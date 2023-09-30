import {
	Column,
	Entity,
	ManyToMany,
	PrimaryGeneratedColumn,
	DeleteDateColumn,
} from "typeorm";
import { User } from "./User";
import { Role } from "./Role";

@Entity()
export class Permission {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column({ type: "varchar", length: 255 })
	name: string;

	@DeleteDateColumn()
	expiredAt: string | null;

	@Column({ type: "text" })
	description: string;

	@ManyToMany(() => User, (user) => user.Permissions, {
		lazy: true,
	})
	Users: Promise<User[]>;

	@ManyToMany(() => Role, (role) => role.Permissions, {
		lazy: true,
	})
	Roles: Promise<Role[]>;
}
