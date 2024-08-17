import { Request, Response } from "express";
import { body, matchedData, param, validationResult } from "express-validator";
import { MESSAGE } from "../constants/message";
import {
  getTrainingDetailById,
  getTrainingListByBiodataId,
  createNewTraining,
  updateTrainingById,
  deleteTrainingById,
} from "../service/training.service";
import { CreateTrainingParam } from "../repository/training.repository";

export const paramsGetTrainingListByBiodataValidator = [
  param("biodataId").notEmpty().isNumeric(),
];

export const getTrainingListByBiodata = async (req: Request, res: Response) => {
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

  const result = await getTrainingListByBiodataId(Number(biodataId));

  return res.status(result.code).send(result);
};

export const paramsGetTrainingDetailByIdValidator = [
  param("id").notEmpty().isNumeric(),
];

export const getTrainingDetail = async (req: Request, res: Response) => {
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

  const result = await getTrainingDetailById(Number(id));

  return res.status(result.code).send(result);
};

export const paramsCreateTrainingValidator = [
  body("course_name", "course_name is required max 150 characters")
    .notEmpty()
    .isLength({ max: 150 }),
  body("is_certificate", "is_certificate must be boolean")
    .notEmpty()
    .isBoolean(),
  body("year_start", "year_start is required max 4 characters")
    .notEmpty()
    .isNumeric()
    .isLength({
      max: 4,
    }),
  body("year_end", "year_end is required max 4 characters")
    .notEmpty()
    .isNumeric()
    .isLength({
      max: 4,
    }),
];

export const createTraining = async (req: Request, res: Response) => {
  const validation = validationResult(req);
  if (!validation.isEmpty()) {
    return res.status(400).send({
      code: 400,
      success: false,
      message: MESSAGE.INVALID_INPUT,
      errors: validation.array(),
    });
  }

  const body: CreateTrainingParam & { biodataId: string } = matchedData(req);
  const biodataId = Number(body.biodataId);

  const result = await createNewTraining(biodataId, body);

  return res.status(result.code).send(result);
};

export const updateTraining = async (req: Request, res: Response) => {
  const validation = validationResult(req);
  if (!validation.isEmpty()) {
    return res.status(400).send({
      code: 400,
      success: false,
      message: MESSAGE.INVALID_INPUT,
      errors: validation.array(),
    });
  }

  const body: CreateTrainingParam & { id: string } = matchedData(req);
  const trainingId = Number(body.id);

  const result = await updateTrainingById(trainingId, body);

  return res.status(result.code).send(result);
};

export const deleteTraining = async (req: Request, res: Response) => {
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
  const result = await deleteTrainingById(Number(id));

  return res.status(result.code).send(result);
};
