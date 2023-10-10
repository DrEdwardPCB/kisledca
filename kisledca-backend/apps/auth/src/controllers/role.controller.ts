import { Elysia, t } from "elysia";
import Container from "typedi";
import { RoleService } from "../services/role.service";
import { Role } from "../database/entities/Role";
import { verifyPermissionFactory } from "../hooks/verifyPermission.hook";
import { JwtMiddleware } from "../middleware/jwt.Middleware";
export const RoleController = new Elysia().group("/role", (app) =>
	app
		.use(JwtMiddleware)
		.get(
			"/",
			async ({ query }) => {
				const svc = Container.get(RoleService);
				return await svc.find({ where: query });
			},
			{
				//@ts-ignore
				beforeHandle: [verifyPermissionFactory(["auth.role.read"])],
			}
		)
		.get(
			"/:id",
			async ({ params: { id } }) => {
				const svc = Container.get(RoleService);
				return await svc.findOne({ where: { id } });
			},
			{
				//@ts-ignore
				beforeHandle: [verifyPermissionFactory(["auth.role.read"])],
			}
		)
		.post(
			"/",
			async ({ body }) => {
				const svc = Container.get(RoleService);
				return await svc.create(body as Partial<Role>);
			},
			{
				//@ts-ignore
				beforeHandle: [verifyPermissionFactory(["auth.role.create"])],
				body: t.Object({
					name: t.String(),
					description: t.String(),
				}),
			}
		)
		.put(
			"/:id",
			async ({ params: { id }, body }) => {
				const svc = Container.get(RoleService);
				return await svc.update(id, body as Partial<Role>);
			},
			{
				//@ts-ignore
				beforeHandle: [verifyPermissionFactory(["auth.role.update"])],
				body: t.Object({
					name: t.String(),
					description: t.String(),
				}),
			}
		)
		.delete(
			"/:id",
			async ({ params: { id } }) => {
				const svc = Container.get(RoleService);
				return await svc.delete(id);
			},
			{
				//@ts-ignore
				beforeHandle: [verifyPermissionFactory(["auth.role.delete"])],
			}
		)
		.put(
			"/:id/permission/:permissionid",
			async ({ params: { id, permissionid } }) => {
				const svc = Container.get(RoleService);
				return await svc.associatePermission(id, permissionid);
			},
			{
				//@ts-ignore
				beforeHandle: [
					verifyPermissionFactory([
						"auth.role.update",
						"auth.permission.update",
					]),
				],
				params: t.Object({
					id: t.String(),
					permissionid: t.String(),
				}),
			}
		)
		.patch(
			"/:id/permission/:permissionid",
			async ({ params: { id, permissionid } }) => {
				const svc = Container.get(RoleService);
				return await svc.dissociatePermission(id, permissionid);
			},
			{
				//@ts-ignore
				beforeHandle: [
					verifyPermissionFactory([
						"auth.role.update",
						"auth.permission.update",
					]),
				],
				params: t.Object({
					id: t.String(),
					permissionid: t.String(),
				}),
			}
		)
);
