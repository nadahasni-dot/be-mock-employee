import { MESSAGE } from "../constants/message";
import { getBiodataById } from "../repository/biodata.repository";
import {
  createJob,
  CreateJobParam,
  getJobDetail,
  getJobList,
  updateJob,
  deleteJob,
} from "../repository/job.repository";

export const getJobListByBiodataId = async (biodataId: number) => {
  try {
    const jobs = await getJobList(biodataId);

    return {
      code: 200,
      success: true,
      message: MESSAGE.JOB.SUCCESS_GET,
      data: jobs,
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

export const getJobDetailById = async (id: number) => {
  try {
    const job = await getJobDetail(id);

    if (!job) {
      return {
        code: 404,
        success: false,
        message: MESSAGE.NOT_FOUND,
        data: job,
      };
    }

    return {
      code: 200,
      success: true,
      message: MESSAGE.JOB.SUCCESS_GET,
      data: job,
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

export const createNewJob = async (biodataId: number, data: CreateJobParam) => {
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

    const job = await createJob({
      ...data,
      biodataId,
    });

    return {
      code: 201,
      success: true,
      message: MESSAGE.JOB.SUCCESS_CREATE,
      data: job,
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

export const updateJobById = async (id: number, data: CreateJobParam) => {
  try {
    const detail = await getJobDetail(id);
    if (!detail) {
      return {
        code: 404,
        success: false,
        message: MESSAGE.NOT_FOUND,
        data: detail,
      };
    }

    const { company_name, last_income, position, year_end, year_start } = data;
    const job = await updateJob(id, {
      company_name,
      last_income,
      position,
      year_end,
      year_start,
    });

    return {
      code: 200,
      success: true,
      message: MESSAGE.JOB.SUCCESS_UPDATE,
      data: job,
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

export const deleteJobById = async (id: number) => {
  try {
    const detail = await getJobDetail(id);
    if (!detail) {
      return {
        code: 404,
        success: false,
        message: MESSAGE.NOT_FOUND,
        data: detail,
      };
    }

    await deleteJob(id);

    return {
      code: 200,
      success: true,
      message: MESSAGE.JOB.SUCCESS_DELETE,
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
