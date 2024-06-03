import express from 'express';
import { createResponseObject, handleErrors } from '../../common/common';
import { queryAllPlantsOfUserPlantsOfUser } from '../../database/plants/queryAllPlantsOfUser';
import { Plant } from '../../types/plant/plant';
import { ConflictError } from '../../errors/error';
import { errorMessages } from '../../errors/errorMessages';
import { doesUserExist } from '../../common/users/common';
import { User } from '../../types/user/user';
import { getUserByUserId } from '../../database/users/queryUserByUserId';

const router = express.Router();

router.get('/:userId', async (req, res) => {
	const userId = req.params.userId;
	try {
		await validateUser(userId);

		const allPlantsOfUser: Plant[] = (await queryAllPlantsOfUserPlantsOfUser(
			userId
		)) as Plant[];

		checkIfUserHasPlants(allPlantsOfUser);

		return createResponseObject(200, allPlantsOfUser, res);
	} catch (error) {
		return handleErrors(error, res);
	}
});

const validateUser = async (userId: string) => {
	const user: User = (await getUserByUserId(userId)) as User;
	doesUserExist(user);
};

const checkIfUserHasPlants = (allPlantsOfUser: Plant[]) => {
	if (allPlantsOfUser.length === 0) {
		throw new ConflictError(errorMessages.userHasNoPlants);
	}
};

export default router;
