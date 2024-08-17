import { prisma } from "../../prisma/prisma.client";

export type CreateEducationParam = {
  level: string;
  institute: string;
  major: string;
  year_graduated: string;
  grade: string;
};

export const createEducation = async (
  data: CreateEducationParam & { biodataId: number }
) => {
  return await prisma.education.create({
    data,
  });
};

export const getEducationList = async (biodataId: number) => {
  return await prisma.education.findMany({ where: { biodataId } });
};

export const getEducationDetail = async (id: number) => {
  return await prisma.education.findFirst({ where: { id } });
};

export const updateEducation = async (
  id: number,
  data: CreateEducationParam
) => {
  return await prisma.education.update({
    data,
    where: {
      id,
    },
  });
};

export const deleteEducation = async (id: number) => {
  return await prisma.education.delete({
    where: {
      id,
    },
  });
};
