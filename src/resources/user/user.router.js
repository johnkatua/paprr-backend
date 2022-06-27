import { Router } from "express";
import controllers from './user.controllers';

const router = Router();

router.route('/signin').post(controllers.signIn);
router.route('/signup').post(controllers.signUp);

export default router;