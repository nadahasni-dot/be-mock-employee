import { prisma } from "../../prisma/prisma.client";

export type CreateTrainingParam = {
  course_name: string;
  is_certificate: boolean;
  year_start: string;
  year_end: string;
};

export const createTraining = async (
  data: CreateTrainingParam & { biodataId: number }
) => {
  return await prisma.training.create({
    data,
  });
};

export const getTrainingList = async (biodataId: number) => {
  return await prisma.training.findMany({ where: { biodataId } });
};

export const getTrainingDetail = async (id: number) => {
  return await prisma.training.findFirst({ where: { id } });
};

export const updateTraining = async (id: number, data: CreateTrainingParam) => {
  return await prisma.training.update({
    data,
    where: {
      id,
    },
  });
};

export const deleteTraining = async (id: number) => {
  return await prisma.training.delete({
    where: {
      id,
    },
  });
};
