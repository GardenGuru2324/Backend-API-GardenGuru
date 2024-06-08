import express from "express";
import { v4 as uuidv4 } from "uuid";
import {
  Config,
  adjectives,
  animals,
  colors,
  uniqueNamesGenerator,
} from "unique-names-generator";
import bcrypt from "bcrypt";

import { createResponseObject, handleErrors } from "../../common/common";
import { User } from "../../types/user/user";
import { CreateUser } from "../../types/user/createUser";
import { queryAddUser } from "../../database/users/queryAddUser";
import validate from "deep-email-validator";
import { ConflictError, UnprocessableContentError } from "../../errors/error";
import { errorMessages } from "../../errors/errorMessages";
import { queryGetuserByEmail } from "../../database/users/queryGetUserByEmail";
import { queryGetUserByUserId } from "../../database/users/queryGetUserByUserId";

const generateUserName = () => {
  const customConfig: Config = {
    dictionaries: [adjectives, colors, animals],
    separator: "-",
    length: 3,
    style: "lowerCase",
  };

  return uniqueNamesGenerator(customConfig);
};
const createUserObject = (
  userId: string,
  userName: string,
  password: string,
  email: string,
  fullName: string,
  accountCreated: number
): CreateUser => {
  return {
    userId: userId,
    userName: userName,
    password: password,
    email: email,
    fullName: fullName,
    accountCreated: accountCreated,
  };
};
const validateEmail = async(email: string): Promise<void> => {
  const validateEmail = await validate({ email: email, validateSMTP: false });
  const isEmailValid: boolean = validateEmail.valid;

  if (!isEmailValid)
    throw new UnprocessableContentError(errorMessages.invalidEmail);
};
const doesUserAlreadyExist = async (email: string): Promise<void> => {
  const foundUser: User = (await queryGetuserByEmail(email)) as User;

  if (foundUser !== null)
    throw new ConflictError(errorMessages.userAlreadyExist);
};
const router = express.Router();

router.post("/register", async (req, res) => {
  try {
    const { email, fullName, password } = req.body;

    validateEmail(email);
    doesUserAlreadyExist(email);

    const userId: string = uuidv4();
    const userName: string = generateUserName();
    const hashPassword: string = await bcrypt.hash(password, 3);
    const accountCreated: number = Date.now();
    const createUser: CreateUser = createUserObject(
      userId,
      userName,
      hashPassword,
      email,
      fullName,
      accountCreated
    );
    await queryAddUser(createUser);
    const createdUser: User = (await queryGetUserByUserId(userId)) as User;

    return createResponseObject(201, createdUser, res);
  } catch (error) {
    return handleErrors(error, res);
  }
});

export default router;
