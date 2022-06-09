import { Router } from "express";
import controllers from "./paper.controllers";
import upload from "../../utils/upload";

const router = Router();

router.route("/").get(controllers.getAll).post(controllers.createOne);

router.post("/create", upload, controllers.addPaper);

router.route("/:id").delete(controllers.removeItem);

export default router;
