import { Elysia, t } from "elysia";
import Container from "typedi";
import { AuthService } from "../services/auth.service";
export const AuthController = new Elysia().group("/auth", (app) =>
	app.post(
		"/login",
		async ({ body: { basic } }) => {
			const svc = Container.get(AuthService);
			return await svc.login(basic);
		},
		{
			body: t.Object({
				basic: t.String(),
			}),
		}
	)
);
