import { Request, Response } from "express";
import { body, matchedData, param, validationResult } from "express-validator";
import { MESSAGE } from "../constants/message";
import {
  getEducationDetailById,
  getEducationListByBiodataId,
  createNewEducation,
  updateEducationById,
  deleteEducationById
} from "../service/education.service";
import { CreateEducationParam } from "../repository/education.repository";

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

export const paramsGetEducationDetailByIdValidator = [
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

export const paramsCreateEducationValidator = [
  body("level", "level is required max 10 characters")
    .notEmpty()
    .isLength({ max: 10 }),
  body("institute", "institute is required max 150 characters")
    .notEmpty()
    .isLength({ max: 150 }),
  body("major", "major is required max 50 characters")
    .notEmpty()
    .isLength({ max: 50 }),
  body("year_graduated", "year_graduated is required max 4 characters")
    .notEmpty()
    .isLength({
      max: 4,
    }),
  body("grade", "grade is required max 4 characters")
    .notEmpty()
    .isLength({ max: 4 }),
];

export const createEducation = async (req: Request, res: Response) => {
  const validation = validationResult(req);
  if (!validation.isEmpty()) {
    return res.status(400).send({
      code: 400,
      success: false,
      message: MESSAGE.INVALID_INPUT,
      errors: validation.array(),
    });
  }

  const body: CreateEducationParam & { biodataId: string } = matchedData(req);
  const biodataId = Number(body.biodataId);

  const result = await createNewEducation(biodataId, body);

  return res.status(result.code).send(result);
};

export const updateEducation = async (req: Request, res: Response) => {
  const validation = validationResult(req);
  if (!validation.isEmpty()) {
    return res.status(400).send({
      code: 400,
      success: false,
      message: MESSAGE.INVALID_INPUT,
      errors: validation.array(),
    });
  }

  const body: CreateEducationParam & { id: string } = matchedData(req);
  const educationId = Number(body.id);

  const result = await updateEducationById(educationId, body);

  return res.status(result.code).send(result);
};

export const deleteEducation = async (req: Request, res: Response) => {
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
  const result = await deleteEducationById(Number(id));

  return res.status(result.code).send(result);
};
