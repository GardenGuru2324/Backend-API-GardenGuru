import express from "express";
import { createResponseObject, handleErrors } from "../../common/common";
import { queryGetAllPlantsOfUser } from "../../database/plants/queryGetAllPlantsOfUser";
import { Plant } from "../../types/plant/plant";
import { ConflictError } from "../../errors/error";
import { errorMessages } from "../../errors/errorMessages";
import { doesUserExist } from "../../common/users/common";
import { User } from "../../types/user/user";
import { queryGetUserByUserId } from "../../database/users/queryGetUserByUserId";

const router = express.Router();

router.get("/user/:userId/plants", async (req, res) => {
	const userId = req.params.userId;
	try {
		await validateUser(userId);

		const allPlantsOfUser: Plant[] = (await queryGetAllPlantsOfUser(userId)) as Plant[];

		checkIfUserHasPlants(allPlantsOfUser);

		return createResponseObject(200, allPlantsOfUser, res);
	} catch (error) {
		return handleErrors(error, res);
	}
});

const validateUser = async (userId: string) => {
	const user: User = (await queryGetUserByUserId(userId)) as User;
	doesUserExist(user);
};

const checkIfUserHasPlants = (allPlantsOfUser: Plant[]) => {
	if (allPlantsOfUser.length === 0) {
		throw new ConflictError(errorMessages.userHasNoPlants);
	}
};

export default router;
