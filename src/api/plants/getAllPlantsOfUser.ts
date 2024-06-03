import express from 'express';
import { createResponseObject, handleErrors } from '../../common/common';
import { queryAllPlantsOfUserPlantsOfUser } from '../../database/plants/queryAllPlantsOfUser';
import { Plant } from '../../types/plant/plant';
import { ConflictError } from '../../errors/error';
import { errorMessages } from '../../errors/errorMessages';

const router = express.Router();

router.get('/user/:userId', async (req, res) => {
	const userId = req.params.userId;
	try {
		const allPlantsOfUser: Plant[] = (await queryAllPlantsOfUserPlantsOfUser(
			userId
		)) as Plant[];

		checkIfUserHasPlants(allPlantsOfUser);

		return createResponseObject(200, allPlantsOfUser, res);
	} catch (error) {
		return handleErrors(error, res);
	}
});

const checkIfUserHasPlants = (allPlantsOfUser: Plant[]) => {
	if (allPlantsOfUser.length === 0) {
		throw new ConflictError(errorMessages.userHasNoPlants);
	}
};

export default router;
