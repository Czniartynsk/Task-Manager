import { Router } from "express";
import { TeamsController } from "../controllers/teams.controller";
import { verifyUserAuthorization } from "../middlewares/verifyUserAuthorization";
import { TeamMembersController } from "../controllers/teamMembers.controller";
import { TasksController } from "../controllers/tasks.controller";

export const teamsRoutes = Router()
const teamsController = new TeamsController()

const teamMembersController = new TeamMembersController()
const tasksController = new TasksController()

teamsRoutes.get("/", teamsController.index)

// teamsRoutes.use(verifyUserAuthorization(["admin"]))
teamsRoutes.post("/", teamsController.create)
teamsRoutes.put("/:id", teamsController.update)

teamsRoutes.post("/:id/members", teamMembersController.create)
teamsRoutes.delete("/:id/members", teamMembersController.remove)

teamsRoutes.post("/:teamId/tasks", tasksController.create)