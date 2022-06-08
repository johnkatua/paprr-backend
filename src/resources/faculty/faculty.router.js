import { Router } from "express";
import controllers from "./faculty.controllers";

const router = Router();

router.route("/")
  .get(controllers.getMany)
  .post(controllers.createOne);

console.log('hello');

export default router;
