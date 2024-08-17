import { MESSAGE } from "../constants/message";
import { getBiodataById } from "../repository/biodata.repository";
import {
  createTraining,
  CreateTrainingParam,
  getTrainingDetail,
  getTrainingList,
  updateTraining,
  deleteTraining,
} from "../repository/training.repository";

export const getTrainingListByBiodataId = async (biodataId: number) => {
  try {
    const trainings = await getTrainingList(biodataId);

    return {
      code: 200,
      success: true,
      message: MESSAGE.TRAINING.SUCCESS_GET,
      data: trainings,
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

export const getTrainingDetailById = async (id: number) => {
  try {
    const training = await getTrainingDetail(id);

    if (!training) {
      return {
        code: 404,
        success: false,
        message: MESSAGE.NOT_FOUND,
        data: training,
      };
    }

    return {
      code: 200,
      success: true,
      message: MESSAGE.TRAINING.SUCCESS_GET,
      data: training,
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

export const createNewTraining = async (
  biodataId: number,
  data: CreateTrainingParam
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

    const training = await createTraining({
      ...data,
      biodataId,
    });

    return {
      code: 201,
      success: true,
      message: MESSAGE.TRAINING.SUCCESS_CREATE,
      data: training,
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

export const updateTrainingById = async (
  id: number,
  data: CreateTrainingParam
) => {
  try {
    const detail = await getTrainingDetail(id);
    if (!detail) {
      return {
        code: 404,
        success: false,
        message: MESSAGE.NOT_FOUND,
        data: detail,
      };
    }

    const { course_name, is_certificate, year_end, year_start } = data;
    const training = await updateTraining(id, {
      course_name,
      is_certificate,
      year_end,
      year_start,
    });

    return {
      code: 200,
      success: true,
      message: MESSAGE.TRAINING.SUCCESS_UPDATE,
      data: training,
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

export const deleteTrainingById = async (id: number) => {
  try {
    const detail = await getTrainingDetail(id);
    if (!detail) {
      return {
        code: 404,
        success: false,
        message: MESSAGE.NOT_FOUND,
        data: detail,
      };
    }

    await deleteTraining(id);

    return {
      code: 200,
      success: true,
      message: MESSAGE.TRAINING.SUCCESS_DELETE,
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
