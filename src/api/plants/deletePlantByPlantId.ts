import express from 'express';

import {
	createResponseObject,
	handleErrors,
} from '../../common/common';
import { queryDeletePlantByPlantIdAndUserId } from '../../database/plants/queryDeletePlantByPlantId';
import { validateUser } from '../../common/users/common';
import { checkIfUserHasPlant } from '../../common/plants/common';

const router = express.Router();

router.delete('/user/:userId/plants/:plantId', async (req, res) => {
	const plantId = req.params.plantId;
	const userId = req.params.userId;

	try {
		await validateUser(userId);

		await checkIfUserHasPlant(plantId, userId);

		await queryDeletePlantByPlantIdAndUserId(plantId, userId);

		return createResponseObject(
			200,
			{ message: 'Plant successfully deleted' },
			res,
		);
	} catch (error) {
		return handleErrors(error, res);
	}
});

export default router;
