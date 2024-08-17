import { MESSAGE } from "../constants/message";
import { getBiodataById } from "../repository/biodata.repository";
import {
  createEducation,
  CreateEducationParam,
  getEducationDetail,
  getEducationList,
  updateEducation,
  deleteEducation,
} from "../repository/education.repository";

export const getEducationListByBiodataId = async (biodataId: number) => {
  try {
    const educations = await getEducationList(biodataId);

    return {
      code: 200,
      success: true,
      message: MESSAGE.EDUCATION.SUCCESS_GET,
      data: educations,
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

export const getEducationDetailById = async (id: number) => {
  try {
    const education = await getEducationDetail(id);

    if (!education) {
      return {
        code: 404,
        success: false,
        message: MESSAGE.NOT_FOUND,
        data: education,
      };
    }

    return {
      code: 200,
      success: true,
      message: MESSAGE.EDUCATION.SUCCESS_GET,
      data: education,
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

export const createNewEducation = async (
  biodataId: number,
  data: CreateEducationParam
) => {
  try {
    const biodata = await getBiodataById(biodataId);
    if (!biodata) {
      return {
        code: 404,
        success: false,
        message: MESSAGE.NOT_FOUND,
        data: biodata,
      };
    }

    const education = await createEducation({
      ...data,
      biodataId,
    });

    return {
      code: 201,
      success: true,
      message: MESSAGE.EDUCATION.SUCCESS_CREATE,
      data: education,
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

export const updateEducationById = async (
  id: number,
  data: CreateEducationParam
) => {
  try {
    const detail = await getEducationDetail(id);
    if (!detail) {
      return {
        code: 404,
        success: false,
        message: MESSAGE.NOT_FOUND,
        data: detail,
      };
    }

    const { grade, institute, level, major, year_graduated } = data;
    const education = await updateEducation(id, {
      grade,
      institute,
      level,
      major,
      year_graduated,
    });

    return {
      code: 200,
      success: true,
      message: MESSAGE.EDUCATION.SUCCESS_UPDATE,
      data: education,
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

export const deleteEducationById = async (id: number) => {
  try {
    const detail = await getEducationDetail(id);
    if (!detail) {
      return {
        code: 404,
        success: false,
        message: MESSAGE.NOT_FOUND,
        data: detail,
      };
    }

    await deleteEducation(id);

    return {
      code: 200,
      success: true,
      message: MESSAGE.EDUCATION.SUCCESS_DELETE,
      data: null,
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
