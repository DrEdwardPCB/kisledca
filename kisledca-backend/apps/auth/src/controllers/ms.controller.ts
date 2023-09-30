import { Elysia, t } from "elysia";
import Container from "typedi";
import { PermissionService } from "../services/permission.service";
import { Like } from "typeorm";
import { isNil } from "lodash";
import { UserService } from "../services/user.service";
import { env } from "../config/env";
import { NotFoundError } from "elysia";
import { JWTService } from "../services/jwt.service";

export const MsController = new Elysia()
	.post(
		"/createPermission",
		async ({ body: { permissions } }) => {
			const svc = Container.get(PermissionService);
			const usvc = Container.get(UserService);
			//identify the first word of every permission
			if (permissions.length < 1) {
				return true;
			}
			const firstPermissionName = permissions[0].name.split(".")[0];
			//get list of permission that have
			const existingPermission = await svc.find({
				where: {
					name: Like(`${firstPermissionName}%`),
				},
			});
			// if exist in both do nothing
			// if only exist in incoming, add permission and bind
			const addings = permissions.filter(
				(e) => !isNil(existingPermission.find((f) => f.name === e.name))
			);
			for (let adding of addings) {
				const added = await svc.create(adding);
				const superAdmin = await usvc.findOne({
					where: { email: env.SUPERADMIN_EMAIL },
				});
				if (isNil(superAdmin)) {
					return new NotFoundError();
				}
				await usvc.associatePermission(superAdmin.id, added.id);
			}
			// if only exist in db, dissociate + delete
			const deletings = existingPermission.filter(
				(e) => !isNil(permissions.find((f) => f.name === e.name))
			);
			for (let deleting of deletings) {
				await svc.delete(deleting.id);
			}
			return true;
		},
		{
			body: t.Object({
				permissions: t.Array(
					t.Object({
						name: t.String(),
						description: t.String(),
					})
				),
			}),
		}
	)
	.post(
		"/verifyPermission",
		async ({ set, body: { jwt, permissions, logic } }) => {
			const svc = Container.get(JWTService);
			//@ts-ignore
			const { permission } = await svc.verify(jwt);
			try {
				const permissionName = (
					permission as { name: string; id: string }[]
				).map((e) => e.name);
				let hasPermission;
				if (logic === "AND") {
					hasPermission = permissions.every((e) =>
						permissionName.includes(e)
					);
				} else {
					hasPermission = permissions.some((e) =>
						permissionName.includes(e)
					);
				}
				if (!hasPermission) {
					set.status = 401;
					return "Unauthorized";
				}
				return true;
			} catch (e) {
				set.status = 401;
				return "Unauthorized";
			}
		},
		{
			body: t.Object({
				jwt: t.String(),
				permissions: t.Array(t.String()),
				logic: t.Union([t.Literal("AND"), t.Literal("OR")]),
			}),
		}
	);
