import { prisma } from "../../prisma/prisma.client";
import { PagedRequestParam } from "../types/requests/biodata";

type CreateBiodataParam = {
  userId: number;
  position?: string;
  name?: string;
  birth_place?: string;
  birth_date?: string;
  gender?: string;
  religion?: string;
  blood_type?: string;
  status?: string;
  address_idcard?: string;
  address_live?: string;
  phone?: string;
  phone_relation?: string;
  skills?: string;
  is_accept_all_placement?: boolean;
  expected_income?: number;
};

const createBiodata = async (data: CreateBiodataParam) => {
  return await prisma.biodata.create({
    data: {
      ...data,
    },
  });
};

const getListBiodata = async ({
  search,
  page = 1,
  perPage = 10,
}: PagedRequestParam) => {
  const skip = (page - 1) * perPage;

  const list = await prisma.biodata.findMany({
    skip,
    take: perPage,
    include: {
      user: true,
    },
    where: {
      name: {
        startsWith: search ? `%${search}%` : undefined,
      },
    },
  });

  const countAllRecords = await prisma.biodata.count();

  return {
    data: list,
    meta: {
      page,
      perPage,
      totalPage: Math.ceil(countAllRecords / perPage),
    },
  };
};

const getBiodataById = async (biodataId: number) => {
  return await prisma.biodata.findFirst({
    include: {
      user: true,
      jobs: true,
      trainings: true,
      educations: true,
    },
    where: {
      id: biodataId,
    },
  });
};

const getBiodataByUserId = async (userId: number) => {
  return await prisma.biodata.findFirst({
    include: {
      user: true,
      jobs: true,
      trainings: true,
      educations: true,
    },
    where: {
      userId,
    },
  });
};

export { createBiodata, getListBiodata, getBiodataById, getBiodataByUserId };
