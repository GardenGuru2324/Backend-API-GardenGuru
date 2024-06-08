import express from "express";
import { createResponseObject, handleErrors, isNullOrUndefined } from "../../common/common";
import { queryDeletePlantByPlantIdAndUserId } from "../../database/plants/queryDeletePlantByPlantId";
import { doesUserExist } from "../../common/users/common";
import { User } from "../../types/user/user";
import { NotFoundError } from "../../errors/error";
import { Plant } from "../../types/plant/plant";
import { errorMessages } from "../../errors/errorMessages";
import { queryGetPlantByPlantIdAndUserId } from "../../database/plants/queryGetPlantByPlantIdAndUserId";
import { queryGetUserByUserId } from "../../database/users/queryGetUserByUserId";

const router = express.Router();

router.delete("/user/:userId/plants/:plantId", async (req, res) => {
	const plantId = req.params.plantId;
	const userId = req.params.userId;

	try {
		await validateUser(userId);

		await checkIfUserHasPlant(plantId, userId);

		await queryDeletePlantByPlantIdAndUserId(plantId, userId);

		return createResponseObject(200, { message: "Plant successfully deleted" }, res);
	} catch (error) {
		return handleErrors(error, res);
	}
});

const validateUser = async (userId: string) => {
	const user: User = (await queryGetUserByUserId(userId)) as User;
	doesUserExist(user);
};

const checkIfUserHasPlant = async (plantId: string, userId: string) => {
	const plant: Plant = (await queryGetPlantByPlantIdAndUserId(plantId, userId)) as Plant;

	if (isNullOrUndefined(plant)) {
		throw new NotFoundError(errorMessages.plantNotFound);
	}
};
export default router;
