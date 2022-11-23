import { Router } from "express";
import * as controller from "./controllers/index.js";

const router = Router();

router.post("/signin", controller.signin);
router.post("/verify-token", controller.verifyToken);

export default router;
