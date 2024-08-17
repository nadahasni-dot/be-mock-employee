import { Request, Response } from "express";
import { validationResult, matchedData } from "express-validator";
import { MESSAGE } from "../constants/message";
import { authenticateUser, signUpNewUser } from "../service/auth.service";

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

export { signUp, signIn };
