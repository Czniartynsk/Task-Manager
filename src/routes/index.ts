import { Router } from "express";
import { usersRoutes } from "./users.routes";
import { sessionsRoutes } from "./sessions.routes";
import { teamsRoutes } from "./teams.routes";
import { tasksRoutes } from "./tasks.routes";
import { ensureAuthenticated } from "../middlewares/ensure-authenticated";
import { verifyUserAuthorization } from "../middlewares/verifyUserAuthorization";

export const routes = Router()

routes.get("/live", (request, response) => {
    return response.json({ message: "Live!!!" })
})

routes.use("/sessions", sessionsRoutes)
routes.use(ensureAuthenticated)

routes.use("/tasks", tasksRoutes)

routes.use(verifyUserAuthorization(["admin"]))

routes.use("/users", usersRoutes)
routes.use("/teams", teamsRoutes)
