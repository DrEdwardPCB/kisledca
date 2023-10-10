import {
	Column,
	Entity,
	JoinTable,
	ManyToMany,
	PrimaryGeneratedColumn,
	DeleteDateColumn,
} from "typeorm";
import { Role } from "./Role";
import { User } from "./User";

@Entity()
export class Group {
	@PrimaryGeneratedColumn("uuid")
	id: string;

	@Column({ type: "varchar", length: 255 })
	name: string;

	@DeleteDateColumn()
	expiredAt: string | null;

	@Column({ type: "text" })
	description: string;

	@ManyToMany(() => User, (user) => user.Roles, {
		lazy: true,
	})
	Users: Promise<User[]>;

	@ManyToMany(() => Role, (role) => role.Groups, {
		lazy: true,
	})
	@JoinTable()
	Roles: Promise<Role[]>;
}
