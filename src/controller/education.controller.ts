import { Request, Response } from "express";
import { matchedData, param, validationResult } from "express-validator";
import { MESSAGE } from "../constants/message";
import {
  getEducationDetailById,
  getEducationListByBiodataId,
} from "../service/education.service";

export const paramsGetEducationListByBiodataValidator = [
  param("biodataId").notEmpty().isNumeric(),
];

export const getEducationListByBiodata = async (
  req: Request,
  res: Response
) => {
  const validation = validationResult(req);
  if (!validation.isEmpty()) {
    return res.status(400).send({
      code: 400,
      success: false,
      message: MESSAGE.INVALID_INPUT,
      errors: validation.array(),
    });
  }

  const { biodataId } = matchedData(req);

  const result = await getEducationListByBiodataId(Number(biodataId));
  return res.status(result.code).send(result);
};

export const paramsgetEducationDetailByIdValidator = [
  param("id").notEmpty().isNumeric(),
];

export const getEducationDetail = async (req: Request, res: Response) => {
  const validation = validationResult(req);
  if (!validation.isEmpty()) {
    return res.status(400).send({
      code: 400,
      success: false,
      message: MESSAGE.INVALID_INPUT,
      errors: validation.array(),
    });
  }

  const { id } = matchedData(req);

  const result = await getEducationDetailById(Number(id));
  return res.status(result.code).send(result);
};
