import { Context } from "elysia";

export function verifyPermissionFactory(
	permissionArr: string[],
	logic: "OR" | "AND" = "AND"
) {
	return ({
		set,
		permission,
	}: {
		permission: { name: string; id: string }[];
	} & Context) => {
		try {
			const permissionName = permission.map((e) => e.name);
			let hasPermission;
			if (logic === "AND") {
				hasPermission = permissionArr.every((e) =>
					permissionName.includes(e)
				);
			} else {
				hasPermission = permissionArr.some((e) =>
					permissionName.includes(e)
				);
			}
			if (!hasPermission) {
				set.status = 401;
				return "Unauthorized";
			}
		} catch (e) {
			set.status = 401;
			return "Unauthorized";
		}
	};
}
