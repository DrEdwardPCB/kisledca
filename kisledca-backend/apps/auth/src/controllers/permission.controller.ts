import { Elysia, t } from "elysia";
import Container from "typedi";
import { PermissionService } from "../services/permission.service";
import { Permission } from "../database/entities/Permission";
import { verifyPermissionFactory } from "../hooks/verifyPermission.hook";
import { JwtMiddleware } from "../middleware/jwt.Middleware";
export const PermissionController = new Elysia().group("/permission", (app) =>
	app
		.use(JwtMiddleware)

		.get(
			"/",
			async ({ query }) => {
				const svc = Container.get(PermissionService);
				return await svc.find({ where: query });
			},
			{
				//@ts-ignore
				beforeHandle: [
					//@ts-ignore
					verifyPermissionFactory(["auth.permission.read"]),
				],
			}
		)
		.get(
			"/:id",
			async ({ params: { id } }) => {
				const svc = Container.get(PermissionService);
				return await svc.findOne({ where: { id } });
			},
			{
				//@ts-ignore
				beforeHandle: [
					//@ts-ignore
					verifyPermissionFactory(["auth.permission.read"]),
				],
			}
		)
		.post(
			"/",
			async ({ body }) => {
				const svc = Container.get(PermissionService);
				return await svc.create(body as Partial<Permission>);
			},
			{
				//@ts-ignore
				beforeHandle: [
					verifyPermissionFactory(["auth.permission.create"]),
				],
				body: t.Object({
					name: t.String(),
					description: t.String(),
				}),
			}
		)
		.put(
			"/:id",
			async ({ params: { id }, body }) => {
				const svc = Container.get(PermissionService);
				return await svc.update(id, body as Partial<Permission>);
			},
			{
				//@ts-ignore
				beforeHandle: [
					verifyPermissionFactory(["auth.permission.update"]),
				],

				body: t.Object({
					name: t.String(),
					description: t.String(),
				}),
			}
		)
		.delete("/:id", async ({ params: { id } }) => {
			const svc = Container.get(PermissionService);
			return await svc.delete(id);
		})
);
