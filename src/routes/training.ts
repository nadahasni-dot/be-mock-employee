import { Router } from "express";
import { isAuthenticated } from "../middleware/auth.middleware";
import {
  getTrainingListByBiodata,
  paramsGetTrainingListByBiodataValidator,
  getTrainingDetail,
  paramsGetTrainingDetailByIdValidator,
  createTraining,
  paramsCreateTrainingValidator,
  updateTraining,
  deleteTraining,
} from "../controller/training.controller";

const router = Router();

router.get(
  "/:biodataId",
  isAuthenticated,
  ...paramsGetTrainingListByBiodataValidator,
  getTrainingListByBiodata
);

router.get(
  "/detail/:id",
  isAuthenticated,
  ...paramsGetTrainingDetailByIdValidator,
  getTrainingDetail
);

router.post(
  "/:biodataId",
  isAuthenticated,
  ...paramsGetTrainingListByBiodataValidator,
  ...paramsCreateTrainingValidator,
  createTraining
);

router.put(
  "/detail/:id",
  isAuthenticated,
  ...paramsGetTrainingDetailByIdValidator,
  ...paramsCreateTrainingValidator,
  updateTraining
);

router.delete(
  "/detail/:id",
  isAuthenticated,
  ...paramsGetTrainingDetailByIdValidator,
  deleteTraining
);

export default router;
