import { Router } from "express";
import { TasksController } from "../controllers/tasks.controller";
import { verifyUserAuthorization } from "../middlewares/verifyUserAuthorization";

export const tasksRoutes = Router()
const tasksController = new TasksController()

tasksRoutes.get("/", tasksController.list)
// tasksRoutes.get("/:id", tasksController.show)

// Membros editam apenas suas próprias tasks
tasksRoutes.put("/:id", tasksController.update)

tasksRoutes.use(verifyUserAuthorization(["admin"]))
tasksRoutes.delete("/:id", tasksController.remove)
