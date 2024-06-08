import express from "express";
import bcrypt from "bcrypt";

import { createResponseObject, handleErrors } from "../../common/common";
import { User } from "../../types/user/user";
import { doesUserExist } from "../../common/users/common";
import { UnauthorizedError } from "../../errors/error";
import { errorMessages } from "../../errors/errorMessages";
import { queryGetuserByEmail } from "../../database/users/queryGetUserByEmail";

const checkPassword = async (password: string, hash: string) => {
  const match: boolean = await bcrypt.compare(password, hash);
  if (!match) throw new UnauthorizedError(errorMessages.invalidPassword);
};
const router = express.Router();

router.get("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user: User = (await queryGetuserByEmail(email)) as User;

    doesUserExist(user);
    checkPassword(password, user.password);

    return createResponseObject(200, user, res);
  } catch (error) {
    return handleErrors(error, res);
  }
});

export default router;
