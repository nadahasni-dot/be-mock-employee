import { Request, Response } from "express";
import {
  validationResult,
  matchedData,
  query,
  param,
  body,
} from "express-validator";
import { MESSAGE } from "../constants/message";
import { PagedRequestParam } from "../types/requests/biodata";
import {
  getPagedBiodataList,
  getDetail,
  getDetailByUser,
  updateDetailBiodataByUser,
  updateDetailBiodata,
  deleteDetail,
} from "../service/biodata.service";
import { CustomRequest } from "../middleware/auth.middleware";
import { CreateBiodataParam } from "../repository/biodata.repository";

const queryGetAllBiodataValidator = [
  query("search").optional(),
  query("page").optional().isNumeric(),
  query("perPage").optional().isNumeric(),
];

const getAllBiodata = async (req: Request, res: Response) => {
  const validation = validationResult(req);
  if (!validation.isEmpty()) {
    return res.status(400).send({
      code: 400,
      success: false,
      message: MESSAGE.INVALID_INPUT,
      errors: validation.array(),
    });
  }

  const query: PagedRequestParam = matchedData(req);

  const result = await getPagedBiodataList({
    search: query.search,
    page: query.page ? Number(query.page) : undefined,
    perPage: query.perPage ? Number(query.perPage) : undefined,
  });

  return res.status(result.code).send(result);
};

const paramGetBiodataDetailValidator = [param("id").notEmpty()];

const getBiodataDetail = async (req: Request, res: Response) => {
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

  const result = await getDetail(Number(id));
  return res.status(result.code).send(result);
};

const deleteBiodataDetail = async (req: Request, res: Response) => {
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

  const result = await deleteDetail(Number(id));
  return res.status(result.code).send(result);
};

const getBiodataDetailByUser = async (req: CustomRequest, res: Response) => {
  if (!req.user) {
    return res.status(404).send({
      code: 404,
      success: false,
      message: MESSAGE.NOT_FOUND,
    });
  }

  const result = await getDetailByUser(req.user.id);
  return res.status(result.code).send(result);
};

const bodyUpdateBiodataValidator = [
  body("userId", "user id is required").notEmpty().isNumeric(),
  body("position", "position is required").notEmpty().isLength({ max: 100 }),
  body("name", "name is required").notEmpty().isLength({ max: 150 }),
  body("birth_place", "birth_place is required")
    .notEmpty()
    .isLength({ max: 150 }),
  body("birth_date", "birth_date is required").notEmpty(),
  body("gender", "gender is required").notEmpty().isLength({ max: 50 }),
  body("religion", "religion is required").notEmpty().isLength({ max: 10 }),
  body("blood_type", "blood_type is required").notEmpty().isLength({ max: 2 }),
  body("status", "status is required").notEmpty().isLength({ max: 50 }),
  body("address_idcard", "address_idcard is required")
    .notEmpty()
    .isLength({ max: 255 }),
  body("address_live", "address_live is required")
    .notEmpty()
    .isLength({ max: 255 }),
  body("phone", "phone is required").notEmpty().isLength({ max: 20 }),
  body("phone_relation", "phone_relation is required")
    .notEmpty()
    .isLength({ max: 20 }),
  body("skills", "skills is required").notEmpty(),
  body("is_accept_all_placement", "is_accept_all_placement is required")
    .notEmpty()
    .isBoolean(),
  body("expected_income", "expected_income is required").notEmpty().isNumeric(),
];

const updateBiodataDetail = async (req: CustomRequest, res: Response) => {
  const validation = validationResult(req);
  if (!validation.isEmpty()) {
    return res.status(400).send({
      code: 400,
      success: false,
      message: MESSAGE.INVALID_INPUT,
      errors: validation.array(),
    });
  }

  const body: CreateBiodataParam & { id: number } = matchedData(req);
  const numberId = Number(body.id);
  const result = await updateDetailBiodata(numberId, {
    ...body,
    id: numberId,
  });
  return res.status(result.code).send(result);
};

const updateBiodataDetailByUser = async (req: CustomRequest, res: Response) => {
  if (!req.user) {
    return res.status(404).send({
      code: 404,
      success: false,
      message: MESSAGE.NOT_FOUND,
    });
  }

  const validation = validationResult(req);
  if (!validation.isEmpty()) {
    return res.status(400).send({
      code: 400,
      success: false,
      message: MESSAGE.INVALID_INPUT,
      errors: validation.array(),
    });
  }

  const body: CreateBiodataParam = matchedData(req);

  const result = await updateDetailBiodataByUser(req.user.id, body);
  return res.status(result.code).send(result);
};

export {
  getAllBiodata,
  getBiodataDetail,
  updateBiodataDetail,
  getBiodataDetailByUser,
  updateBiodataDetailByUser,
  bodyUpdateBiodataValidator,
  queryGetAllBiodataValidator,
  paramGetBiodataDetailValidator,
  deleteBiodataDetail,
};
