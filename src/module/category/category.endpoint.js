import { Roles } from "../../middleware/auth.middleware.js";

export const endpoints= {
    create:[Roles.admin],
    update:[Roles.admin],
    get:[Roles.userRoles.admin],
}