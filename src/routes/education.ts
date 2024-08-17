import { Router } from "express";
import { isAuthenticated } from "../middleware/auth.middleware";
import {
  getEducationDetail,
  getEducationListByBiodata,
  paramsgetEducationDetailByIdValidator,
  paramsGetEducationListByBiodataValidator,
} from "../controller/education.controller";

const router = Router();

router.get(
  "/:biodataId",
  isAuthenticated,
  ...paramsGetEducationListByBiodataValidator,
  getEducationListByBiodata
);

router.get(
  "/detail/:id",
  isAuthenticated,
  ...paramsgetEducationDetailByIdValidator,
  getEducationDetail
);

export default router;
