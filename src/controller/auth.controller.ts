import { Request, Response } from "express";
import { validationResult, matchedData, body } from "express-validator";
import { MESSAGE } from "../constants/message";
import { authenticateUser, signUpNewUser } from "../service/auth.service";

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

const signUp = async (req: Request, res: Response) => {
  const validation = validationResult(req);
  if (!validation.isEmpty()) {
    return res.status(400).send({
      code: 400,
      success: false,
      message: MESSAGE.INVALID_INPUT,
      errors: validation.array(),
    });
  }

  const body = matchedData(req);
  const { email, password } = body;

  const result = await signUpNewUser({ email, password });
  return res.status(result.code).send(result);
};

const signIn = async (req: Request, res: Response) => {
  const validation = validationResult(req);
  if (!validation.isEmpty()) {
    return res.status(400).send({
      code: 400,
      success: false,
      message: MESSAGE.INVALID_INPUT,
      errors: validation.array(),
    });
  }

  const body = matchedData(req);
  const { email, password } = body;

  const result = await authenticateUser({ email, password });
  return res.status(result.code).send(result);
};

export { signUp, signIn, authValidation };
