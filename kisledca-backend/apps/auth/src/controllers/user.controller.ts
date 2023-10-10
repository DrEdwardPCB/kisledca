import { Elysia, t } from "elysia";
import Container from "typedi";
import { UserService } from "../services/user.service";
import { User } from "../database/entities/User";
import { verifyPermissionFactory } from "../hooks/verifyPermission.hook";
import { JwtMiddleware } from "../middleware/jwt.Middleware";
export const UserController = new Elysia().group("/user", (app) =>
	app
		.use(JwtMiddleware)

		.get(
			"/",
			async ({ query }) => {
				const svc = Container.get(UserService);
				return await svc.find({ where: query });
			},
			{
				//@ts-ignore
				beforeHandle: [verifyPermissionFactory(["auth.user.read"])],
			}
		)
		.get(
			"/:id",
			async ({ params: { id } }) => {
				const svc = Container.get(UserService);
				return await svc.findOne({ where: { id } });
			},
			{
				//@ts-ignore
				beforeHandle: [verifyPermissionFactory(["auth.user.read"])],
			}
		)
		.post(
			"/",
			async ({ body }) => {
				const svc = Container.get(UserService);
				return await svc.create(body as Partial<User>);
			},
			{
				body: t.Object({
					email: t.String(),
					password: t.String(),
					enabled: t.Boolean(),
				}),

				//@ts-ignore
				beforeHandle: [verifyPermissionFactory(["auth.user.create"])],
			}
		)
		.put(
			"/:id",
			async ({ params: { id }, body }) => {
				const svc = Container.get(UserService);
				return await svc.update(id, body as Partial<User>);
			},
			{
				body: t.Object({
					email: t.String(),
					password: t.String(),
					enabled: t.Boolean(),
				}),
				//@ts-ignore
				beforeHandle: [verifyPermissionFactory(["auth.user.create"])],
			}
		)
		.delete(
			"/:id",
			async ({ params: { id } }) => {
				const svc = Container.get(UserService);
				return await svc.delete(id);
			},
			{
				//@ts-ignore
				beforeHandle: [verifyPermissionFactory(["auth.user.read"])],
			}
		)
		.put(
			"/:id/permission/:permissionid",
			async ({ params: { id, permissionid } }) => {
				const svc = Container.get(UserService);
				return await svc.associatePermission(id, permissionid);
			},
			{
				//@ts-ignore
				beforeHandle: [
					verifyPermissionFactory([
						"auth.user.update",
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
				const svc = Container.get(UserService);
				return await svc.dissociatePermission(id, permissionid);
			},
			{
				//@ts-ignore
				beforeHandle: [
					verifyPermissionFactory([
						"auth.user.update",
						"auth.permission.update",
					]),
				],
				params: t.Object({
					id: t.String(),
					permissionid: t.String(),
				}),
			}
		)
		.put(
			"/:id/group/:groupid",
			async ({ params: { id, groupid } }) => {
				const svc = Container.get(UserService);
				return await svc.associateGroup(id, groupid);
			},
			{
				//@ts-ignore
				beforeHandle: [
					verifyPermissionFactory([
						"auth.user.update",
						"auth.group.update",
					]),
				],
				params: t.Object({
					id: t.String(),
					groupid: t.String(),
				}),
			}
		)
		.patch(
			"/:id/group/:groupid",
			async ({ params: { id, groupid } }) => {
				const svc = Container.get(UserService);
				return await svc.dissociateGroup(id, groupid);
			},
			{
				//@ts-ignore
				beforeHandle: [
					verifyPermissionFactory([
						"auth.user.update",
						"auth.group.update",
					]),
				],
				params: t.Object({
					id: t.String(),
					groupid: t.String(),
				}),
			}
		)
		.put(
			"/:id/role/:roleid",
			async ({ params: { id, roleid } }) => {
				const svc = Container.get(UserService);
				return await svc.associateRole(id, roleid);
			},
			{
				//@ts-ignore
				beforeHandle: [
					verifyPermissionFactory([
						"auth.user.update",
						"auth.role.update",
					]),
				],
				params: t.Object({
					id: t.String(),
					roleid: t.String(),
				}),
			}
		)
		.patch(
			"/:id/role/:roleid",
			async ({ params: { id, roleid } }) => {
				const svc = Container.get(UserService);
				return await svc.dissociateRole(id, roleid);
			},
			{
				//@ts-ignore
				beforeHandle: [
					verifyPermissionFactory([
						"auth.user.update",
						"auth.role.update",
					]),
				],
				params: t.Object({
					id: t.String(),
					roleid: t.String(),
				}),
			}
		)
);
