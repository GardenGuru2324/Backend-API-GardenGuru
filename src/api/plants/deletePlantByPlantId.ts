import express from 'express';
import { createResponseObject, handleErrors, isNullOrUndefined } from '../../common/common';
import { queryDeletePlantByPlantId } from '../../database/plants/queryDeletePlantByPlantId';
import { doesUserExist } from '../../common/users/common';
import { User } from '../../types/user/user';
import { getUserByUserId } from '../../database/users/queryUserByUserId';
import { queryPlantByPlantId } from '../../database/plants/queryPlantByPlantId';
import { ConflictError, NotFoundError } from '../../errors/error';
import { Plant } from '../../types/plant/plant';
import { checkIfPlantExists } from '../../checks/plant/plantChecks';

const router = express.Router();

router.delete('/user/:userId/plants/:plantId', async (req, res) => {
	const plantId = req.params.plantId;
	const userId = req.params.userId;

	try {
		await validateUser(userId);

		await checkIfUserHasPlant(plantId, userId);

		await queryDeletePlantByPlantId(plantId);

		return createResponseObject(204, { message: 'Plant deleted' }, res);
	} catch (error) {
		return handleErrors(error, res);
	}
});

const validateUser = async (userId: string) => {
	const user: User = (await getUserByUserId(userId)) as User;
	doesUserExist(user);
};

const checkIfUserHasPlant = async (plantId: string, userId: string) => {
	const plant: Plant = await checkIfPlantExists(plantId);

	if (plant.userId !== userId) {
		throw new ConflictError('You are not the owner of the plant!');
	}
};
export default router;
