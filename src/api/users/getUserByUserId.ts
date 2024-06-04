import express from "express";
import { createResponseObject, handleErrors } from "../../common/common";
import { queryUserByUserId } from "../../database/users/queryUserByUserId";
import { User } from "../../types/user/user";
import { doesUserExist } from "../../common/users/common";

const router = express.Router();

router.get("/user/:id", async (req, res) => {
  try {
    const userId: string = req.params.id;

    const user: User = (await queryUserByUserId(userId)) as User;
    doesUserExist(user);
    return createResponseObject(200, user, res);
  } catch (error) {
    return handleErrors(error, res);
  }
});

export default router;
