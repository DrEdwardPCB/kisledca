import "reflect-metadata";
import { Elysia, t } from "elysia";
import { swagger } from "@elysiajs/swagger";
import Container from "typedi";
import { AuthService } from "./services/auth.service";
import { UserController } from "./controllers/user.controller";
import { AuthController } from "./controllers/auth.controller";
import { RoleController } from "./controllers/role.controller";
import { GroupController } from "./controllers/group.controller";
import { PermissionController } from "./controllers/permission.controller";
import { JwtMiddleware } from "./middleware/jwt.Middleware";
import { seedPermission, seedSuperAdmin } from "./database/seeder/seedAuth";
import { MsController } from "./controllers/ms.controller";

const elysia = new Elysia()
	.use(swagger())
	.group("/api", (app) =>
		app
			.use(AuthController)
			.use(UserController)
			.use(RoleController)
			.use(GroupController)
			.use(PermissionController)
	)
	.use(MsController)

	.listen(8080);
await seedPermission();
await seedSuperAdmin();
