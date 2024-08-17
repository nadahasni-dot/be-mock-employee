import { Router } from "express";
import { isAuthenticated } from "../middleware/auth.middleware";
import {
  getJobListByBiodata,
  paramsGetJobListByBiodataValidator,
  getJobDetail,
  paramsGetJobDetailByIdValidator,
  createJob,
  paramsCreateJobValidator,
  updateJob,
  deleteJob,
} from "../controller/job.controller";

const router = Router();

router.get(
  "/:biodataId",
  isAuthenticated,
  ...paramsGetJobListByBiodataValidator,
  getJobListByBiodata
);

router.get(
  "/detail/:id",
  isAuthenticated,
  ...paramsGetJobDetailByIdValidator,
  getJobDetail
);

router.post(
  "/:biodataId",
  isAuthenticated,
  ...paramsGetJobListByBiodataValidator,
  ...paramsCreateJobValidator,
  createJob
);

router.put(
  "/detail/:id",
  isAuthenticated,
  ...paramsGetJobDetailByIdValidator,
  ...paramsCreateJobValidator,
  updateJob
);

router.delete(
  "/detail/:id",
  isAuthenticated,
  ...paramsGetJobDetailByIdValidator,
  deleteJob
);

export default router;
