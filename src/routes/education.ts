import { Router } from "express";
import { isAuthenticated } from "../middleware/auth.middleware";
import {
  getEducationListByBiodata,
  paramsGetEducationListByBiodataValidator,
  getEducationDetail,
  paramsGetEducationDetailByIdValidator,
  createEducation,
  paramsCreateEducationValidator,
  updateEducation,
  deleteEducation,
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
  ...paramsGetEducationDetailByIdValidator,
  getEducationDetail
);

router.post(
  "/:biodataId",
  isAuthenticated,
  ...paramsGetEducationListByBiodataValidator,
  ...paramsCreateEducationValidator,
  createEducation
);

router.put(
  "/detail/:id",
  isAuthenticated,
  ...paramsGetEducationDetailByIdValidator,
  ...paramsCreateEducationValidator,
  updateEducation
);

router.delete(
  "/detail/:id",
  isAuthenticated,
  ...paramsGetEducationDetailByIdValidator,
  deleteEducation
);

export default router;
