import { Router } from "express";
import {
  getAllBiodata,
  getBiodataDetail,
  getBiodataDetailByUser,
  paramGetBiodataDetailValidator,
  queryGetAllBiodataValidator,
} from "../controller/biodata.controller";
import { isAdminOnly, isAuthenticated } from "../middleware/auth.middleware";

const router = Router();

// ADMIN ONLY ACCESS
router.get(
  "/admin",
  isAdminOnly,
  ...queryGetAllBiodataValidator,
  getAllBiodata
);
router.get(
  "/admin/:id",
  isAdminOnly,
  ...paramGetBiodataDetailValidator,
  getBiodataDetail
);

// USER ACCESS
router.get(
  "/detail",
  isAuthenticated,
  ...paramGetBiodataDetailValidator,
  getBiodataDetailByUser
);

export default router;
