import { Request, Response } from "express";
import { body, matchedData, param, validationResult } from "express-validator";
import { MESSAGE } from "../constants/message";
import {
  getJobDetailById,
  getJobListByBiodataId,
  createNewJob,
  updateJobById,
  deleteJobById,
} from "../service/job.service";
import { CreateJobParam } from "../repository/job.repository";

export const paramsGetJobListByBiodataValidator = [
  param("biodataId").notEmpty().isNumeric(),
];

export const getJobListByBiodata = async (req: Request, res: Response) => {
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

  const result = await getJobListByBiodataId(Number(biodataId));

  return res.status(result.code).send(result);
};

export const paramsGetJobDetailByIdValidator = [
  param("id").notEmpty().isNumeric(),
];

export const getJobDetail = async (req: Request, res: Response) => {
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

  const result = await getJobDetailById(Number(id));

  return res.status(result.code).send(result);
};

export const paramsCreateJobValidator = [
  body("company_name", "company_name is required max 100 characters")
    .notEmpty()
    .isLength({ max: 100 }),
  body("position", "position is required max 100 characters")
    .notEmpty()
    .isLength({ max: 100 }),
  body("last_income", "last_income is required and must be number")
    .notEmpty()
    .isNumeric(),
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

export const createJob = async (req: Request, res: Response) => {
  const validation = validationResult(req);
  if (!validation.isEmpty()) {
    return res.status(400).send({
      code: 400,
      success: false,
      message: MESSAGE.INVALID_INPUT,
      errors: validation.array(),
    });
  }

  const body: CreateJobParam & { biodataId: string } = matchedData(req);
  const biodataId = Number(body.biodataId);

  const result = await createNewJob(biodataId, {
    ...body,
    last_income: Number(body.last_income),
  });

  return res.status(result.code).send(result);
};

export const updateJob = async (req: Request, res: Response) => {
  const validation = validationResult(req);
  if (!validation.isEmpty()) {
    return res.status(400).send({
      code: 400,
      success: false,
      message: MESSAGE.INVALID_INPUT,
      errors: validation.array(),
    });
  }

  const body: CreateJobParam & { id: string } = matchedData(req);
  const jobId = Number(body.id);

  const result = await updateJobById(jobId, {
    company_name: body.company_name,
    position: body.position,
    last_income: Number(body.last_income),
    year_start: body.year_start,
    year_end: body.year_end,
  });

  return res.status(result.code).send(result);
};

export const deleteJob = async (req: Request, res: Response) => {
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
  const result = await deleteJobById(Number(id));

  return res.status(result.code).send(result);
};
