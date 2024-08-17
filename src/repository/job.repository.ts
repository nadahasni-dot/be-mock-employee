import { prisma } from "../../prisma/prisma.client";

export type CreateJobParam = {
  company_name: string;
  position: string;
  last_income: number;
  year_start: string;
  year_end: string;
};

export const createJob = async (
  data: CreateJobParam & { biodataId: number }
) => {
  return await prisma.job.create({
    data,
  });
};

export const getJobList = async (biodataId: number) => {
  return await prisma.job.findMany({ where: { biodataId } });
};

export const getJobDetail = async (id: number) => {
  return await prisma.job.findFirst({ where: { id } });
};

export const updateJob = async (id: number, data: CreateJobParam) => {
  return await prisma.job.update({
    data,
    where: {
      id,
    },
  });
};

export const deleteJob = async (id: number) => {
  return await prisma.job.delete({
    where: {
      id,
    },
  });
};
