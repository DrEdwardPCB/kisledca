import { Container } from "typedi";
import { UserService } from "../../services/user.service";
import { PermissionService } from "../../services/permission.service";
import { isNil } from "lodash";
import { env } from "../../config/env";
export async function seedPermission() {
	const permissions = [
		"auth.user.read",
		"auth.user.create",
		"auth.user.update",
		"auth.user.delete",
		"auth.role.read",
		"auth.role.create",
		"auth.role.update",
		"auth.role.delete",
		"auth.group.read",
		"auth.group.create",
		"auth.group.update",
		"auth.group.delete",
		"auth.permission.read",
		"auth.permission.create",
		"auth.permission.update",
		"auth.permission.delete",
	];
	const ps = Container.get(PermissionService);
	for (const permission of permissions) {
		const foundPermission = await ps.findOne({
			where: { name: permission },
		});
		if (isNil(foundPermission)) {
			await ps.create({ name: permission, description: "" });
		}
	}
}

export async function seedSuperAdmin() {
	// create a super admin if it does not have
	// for each permission if it is not added to super admin add it
	const us = Container.get(UserService);
	const ps = Container.get(PermissionService);
	const superAdminEmail = env.SUPERADMIN_EMAIL;
	const superAdminPassword = env.SUPERADMIN_PASSWORD; // TODO: change to random
	let foundSuperAdmin = await us.findOne({
		where: { email: superAdminEmail },
	});
	if (isNil(foundSuperAdmin)) {
		foundSuperAdmin = await us.create({
			email: superAdminEmail,
			password: superAdminPassword,
			enabled: true,
		});
	}
	const listOfPermissionSuperAdminPosess =
		(await foundSuperAdmin.Permissions) ?? [];
	const permissionList = await ps.find({});
	for (const permission of permissionList) {
		const foundPermission = await listOfPermissionSuperAdminPosess.find(
			(e) => e.name === permission.name
		);
		if (isNil(foundPermission)) {
			await us.associatePermission(foundSuperAdmin.id, permission.id);
		}
	}
}
