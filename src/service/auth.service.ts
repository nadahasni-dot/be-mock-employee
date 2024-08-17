import * as bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { MESSAGE } from "../constants/message";
import { getUserByEmail, insertUser } from "../repository/user.repository";
import { createBiodata } from "../repository/biodata.repository";

const SALT_ROUND = process.env.SALT_ROUND || "10";
const JWT_SECRET = process.env.JWT_SECRET || "SECRET";

type SignUpParam = {
  email: string;
  password: string;
};

type AuthenticateUserParam = {
  email: string;
  password: string;
};

const signUpNewUser = async ({ email, password }: SignUpParam) => {
  try {
    const user = await getUserByEmail(email);

    if (user) {
      return {
        code: 400,
        success: false,
        message: MESSAGE.AUTH.EMAIL_ALREADY_REGISTERED,
        data: null,
      };
    }

    const hashedPassword = bcrypt.hashSync(password, Number(SALT_ROUND));

    const newUser = await insertUser({
      email,
      password: hashedPassword,
    });

    await createBiodata({
      userId: newUser.id,
    });

    return {
      code: 200,
      success: true,
      message: MESSAGE.AUTH.SIGN_UP_SUCCESS,
      data: newUser,
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

const authenticateUser = async ({ email, password }: AuthenticateUserParam) => {
  try {
    const user = await getUserByEmail(email);

    if (!user) {
      return {
        code: 404,
        success: false,
        message: MESSAGE.AUTH.EMAIL_NOT_REGISTERED,
        data: null,
      };
    }

    const isPasswordValid = bcrypt.compareSync(password, user.password);

    if (!isPasswordValid) {
      return {
        code: 401,
        success: false,
        message: MESSAGE.AUTH.PASSWORD_NOT_VALID,
        data: null,
      };
    }

    const token = jwt.sign(user, JWT_SECRET);

    return {
      code: 200,
      success: true,
      message: MESSAGE.AUTH.SIGN_IN_SUCCESS,
      data: {
        ...user,
        token,
      },
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

export { signUpNewUser, authenticateUser };
