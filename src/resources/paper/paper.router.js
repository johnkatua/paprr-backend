import { Router } from 'express';
import controllers from './paper.controllers';

const router = Router();

router.route("/")
  .get(controllers.getAll)
  .post(controllers.createOne)

router.route("/:id")
  .delete(controllers.removeItem)

export default router;