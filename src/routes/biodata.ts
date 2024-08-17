import { Router } from "express";
import {
  bodyUpdateBiodataValidator,
  getAllBiodata,
  getBiodataDetail,
  getBiodataDetailByUser,
  paramGetBiodataDetailValidator,
  queryGetAllBiodataValidator,
  updateBiodataDetail,
  updateBiodataDetailByUser,
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
router.put(
  "/admin/update/:id",
  isAdminOnly,
  ...paramGetBiodataDetailValidator,
  ...bodyUpdateBiodataValidator,
  updateBiodataDetail
);

// USER ACCESS
router.get(
  "/detail",
  isAuthenticated,
  ...paramGetBiodataDetailValidator,
  getBiodataDetailByUser
);
router.put(
  "/update",
  isAuthenticated,
  ...bodyUpdateBiodataValidator,
  updateBiodataDetailByUser
);

export default router;
