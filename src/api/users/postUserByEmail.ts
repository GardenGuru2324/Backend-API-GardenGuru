import express from "express";
import bcrypt from "bcrypt";

import { createResponseObject, handleErrors } from "../../common/common";
import { User } from "../../types/user/user";
import { doesUserExist } from "../../common/users/common";
import { UnauthorizedError } from "../../errors/error";
import { errorMessages } from "../../errors/errorMessages";
import { queryGetUserByEmail } from "../../database/users/queryGetUserByEmail";

const router = express.Router();

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user: User = (await queryGetUserByEmail(email)) as User;

    doesUserExist(user);
    await checkPassword(password, user.password);

    return createResponseObject(200, user, res);
  } catch (error) {
    return handleErrors(error, res);
  }
});

const checkPassword = async (password: string, hash: string) => {
  const match: boolean = await bcrypt.compare(password, hash);
  if (!match) throw new UnauthorizedError(errorMessages.invalidPassword);
};

export default router;
