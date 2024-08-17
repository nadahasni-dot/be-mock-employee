import { Request, Response } from "express";
import { query, validationResult, matchedData, param } from "express-validator";
import { MESSAGE } from "../constants/message";
import { PagedRequestParam } from "../types/requests/biodata";
import {
  getPagedBiodataList,
  getDetail,
  getDetailByUser,
} from "../service/biodata.service";
import { CustomRequest } from "../middleware/auth.middleware";

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

export {
  getAllBiodata,
  getBiodataDetail,
  getBiodataDetailByUser,
  queryGetAllBiodataValidator,
  paramGetBiodataDetailValidator,
};
