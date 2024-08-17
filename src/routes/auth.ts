import { Router } from "express";
import { signIn, signUp } from "../controller/auth.controller";
import { body } from "express-validator";

const router = Router();

const authValidation = [
  body("email", "Email must be valid email and max 50 characters long")
    .isEmail()
    .isLength({ max: 50 })
    .notEmpty()
    .trim()
    .escape(),
  body("password", "Password must be 6 - 16 characters long")
    .isLength({ min: 6, max: 16 })
    .notEmpty()
    .trim()
    .escape(),
];

router.post("/signin", ...authValidation, signIn);
router.post("/signup", ...authValidation, signUp);

export default router;
