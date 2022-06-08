import { Router } from 'express';
import controllers from './paper.controllers';

const router = Router();

router.route("/")
  .post(controllers.createOne)

export default router;