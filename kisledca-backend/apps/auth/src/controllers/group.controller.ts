import { Elysia, t } from "elysia";
import Container from "typedi";
import { GroupService } from "../services/group.service";
import { Group } from "../database/entities/Group";
import { verifyPermissionFactory } from "../hooks/verifyPermission.hook";
import { JwtMiddleware } from "../middleware/jwt.Middleware";
export const GroupController = new Elysia().group("/group", (app) =>
	app
		.use(JwtMiddleware)
		.get(
			"/",
			async ({ query }) => {
				const svc = Container.get(GroupService);
				return await svc.find({ where: query });
			},
			{
				//@ts-ignore
				beforeHandle: [verifyPermissionFactory(["auth.group.read"])],
			}
		)
		.get(
			"/:id",
			async ({ params: { id } }) => {
				const svc = Container.get(GroupService);
				return await svc.findOne({ where: { id } });
			},
			{
				//@ts-ignore
				beforeHandle: [verifyPermissionFactory(["auth.group.read"])],
			}
		)
		.post(
			"/",
			async ({ body }) => {
				const svc = Container.get(GroupService);
				return await svc.create(body as Partial<Group>);
			},
			{
				//@ts-ignore
				beforeHandle: [verifyPermissionFactory(["auth.group.create"])],
				body: t.Object({
					name: t.String(),
					description: t.String(),
				}),
			}
		)
		.put(
			"/:id",
			async ({ params: { id }, body }) => {
				const svc = Container.get(GroupService);
				return await svc.update(id, body as Partial<Group>);
			},
			{
				//@ts-ignore
				beforeHandle: [verifyPermissionFactory(["auth.group.update"])],
				body: t.Object({
					name: t.String(),
					description: t.String(),
				}),
			}
		)
		.delete(
			"/:id",
			async ({ params: { id } }) => {
				const svc = Container.get(GroupService);
				return await svc.delete(id);
			},
			{
				//@ts-ignore
				beforeHandle: [verifyPermissionFactory(["auth.group.delete"])],
			}
		)
		.put(
			"/:id/role/:roleid",
			async ({ params: { id, roleid } }) => {
				const svc = Container.get(GroupService);
				return await svc.associateRole(id, roleid);
			},
			{
				//@ts-ignore
				beforeHandle: [
					verifyPermissionFactory([
						"auth.group.update",
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
				const svc = Container.get(GroupService);
				return await svc.dissociateRole(id, roleid);
			},
			{
				//@ts-ignore
				beforeHandle: [
					verifyPermissionFactory([
						"auth.group.update",
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
