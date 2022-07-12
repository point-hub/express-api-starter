import { Router } from "express";
import * as controller from "./controllers/index.js";
import testMiddleware from "./middleware/test.middleware.js";

const router = Router();
// autenticate(), authorize(createPolicy), validateRequest(creteRequest),

router.use(testMiddleware);

router.get("/", controller.readAll);
router.get("/:id", controller.readOne);
router.post("/", controller.create);
router.patch("/:id", controller.update);
router.delete("/:id", controller.destroy);

export default router;
