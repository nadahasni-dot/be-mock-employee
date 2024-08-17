import { MESSAGE } from "../constants/message";
import {
  getEducationDetail,
  getEducationList,
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
