import { MESSAGE } from "../constants/message";
import {
  getBiodataById,
  getListBiodata,
  getBiodataByUserId,
  updateBiodata,
  CreateBiodataParam,
} from "../repository/biodata.repository";
import { PagedRequestParam } from "../types/requests/biodata";

const getPagedBiodataList = async ({
  search,
  page,
  perPage,
}: PagedRequestParam) => {
  try {
    const biodataList = await getListBiodata({ search, page, perPage });
    return {
      code: 200,
      success: true,
      message: MESSAGE.BIODATA.SUCCESS_GET,
      ...biodataList,
    };
  } catch (error) {
    return {
      code: 500,
      success: false,
      message: MESSAGE.SERVER_ERROR,
      data: null,
    };
  }
};

const getDetail = async (id: number) => {
  try {
    const data = await getBiodataById(id);

    if (!data) {
      return {
        code: 404,
        success: false,
        message: MESSAGE.NOT_FOUND,
        data,
      };
    }

    return {
      code: 200,
      success: true,
      message: MESSAGE.BIODATA.SUCCESS_GET,
      data,
    };
  } catch (error) {
    return {
      code: 500,
      success: false,
      message: MESSAGE.SERVER_ERROR,
      data: null,
    };
  }
};

const getDetailByUser = async (id: number) => {
  try {
    const data = await getBiodataByUserId(id);

    if (!data) {
      return {
        code: 404,
        success: false,
        message: MESSAGE.NOT_FOUND,
        data,
      };
    }

    return {
      code: 200,
      success: true,
      message: MESSAGE.BIODATA.SUCCESS_GET,
      data,
    };
  } catch (error) {
    return {
      code: 500,
      success: false,
      message: MESSAGE.SERVER_ERROR,
      data: null,
    };
  }
};

const updateDetailBiodata = async (
  id: number,
  data: CreateBiodataParam & { id: number }
) => {
  try {
    const detail = await getBiodataById(id);

    if (!detail) {
      return {
        code: 404,
        success: false,
        message: MESSAGE.NOT_FOUND,
        detail,
      };
    }

    const result = await updateBiodata(id, data);

    return {
      code: 200,
      success: true,
      message: MESSAGE.BIODATA.SUCCESS_UPDATE,
      data: result,
    };
  } catch (error) {
    console.log(error);
    return {
      code: 500,
      success: false,
      message: MESSAGE.SERVER_ERROR,
      data: null,
    };
  }
};

const updateDetailBiodataByUser = async (
  id: number,
  data: CreateBiodataParam
) => {
  try {
    const detail = await getBiodataByUserId(id);

    if (!detail) {
      return {
        code: 404,
        success: false,
        message: MESSAGE.NOT_FOUND,
        detail,
      };
    }

    const result = await updateBiodata(detail.id, data);

    return {
      code: 200,
      success: true,
      message: MESSAGE.BIODATA.SUCCESS_UPDATE,
      data: result,
    };
  } catch (error) {
    console.log(error);
    return {
      code: 500,
      success: false,
      message: MESSAGE.SERVER_ERROR,
      data: null,
    };
  }
};

export {
  getPagedBiodataList,
  getDetail,
  getDetailByUser,
  updateDetailBiodata,
  updateDetailBiodataByUser,
};
