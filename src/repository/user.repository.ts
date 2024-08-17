import { prisma } from "../../prisma/prisma.client";

type InsertUserParam = {
  email: string;
  password: string;
};

const insertUser = async ({ email, password }: InsertUserParam) => {
  return await prisma.user.create({
    data: {
      email,
      password,
    },
  });
};

const getUserByEmail = async (email: string) => {
  return await prisma.user.findFirst({
    where: { email },
  });
};

export { insertUser, getUserByEmail };
