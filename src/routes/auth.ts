import { Router } from "express";
import { authValidation, signIn, signUp } from "../controller/auth.controller";

const router = Router();

router.post("/signin", ...authValidation, signIn);
router.post("/signup", ...authValidation, signUp);

export default router;
