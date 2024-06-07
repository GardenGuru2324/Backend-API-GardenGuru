import express from "express";
import bcrypt from "bcrypt";

import { createResponseObject, handleErrors } from "../../common/common";
import { queryGetUserByUserId } from "../../database/users/queryGetUserByUserId";
import { User } from "../../types/user/user";
import { doesUserExist } from "../../common/users/common";
import { UnauthorizedError } from "../../errors/error";
import { errorMessages } from "../../errors/errorMessages";

const checkPassword = async (password: string, hash: string) => {
  const match: boolean = await bcrypt.compare(password, hash);
  if (!match) throw new UnauthorizedError(errorMessages.invalidPassword);
};
const router = express.Router();

router.get("/user/:id/:password", async (req, res) => {
  try {
    const userId: string = req.params.id;
    const password: string = req.params.password;

    const user: User = (await queryGetUserByUserId(userId)) as User;

    doesUserExist(user);
    checkPassword(password, user.password);

    return createResponseObject(200, user, res);
  } catch (error) {
    return handleErrors(error, res);
  }
});

export default router;
