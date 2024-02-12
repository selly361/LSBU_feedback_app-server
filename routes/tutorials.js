import * as controllers from "../controllers/tutorialControllers.js"

import express from "express"

const router = express.Router()

router.get("/", controllers.getAllTutorials)


export default router
