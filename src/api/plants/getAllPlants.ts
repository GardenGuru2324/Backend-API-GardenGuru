import express from 'express';

import { createResponseObject, handleErrors } from '../../common/common';
import { Plant } from '../../types/plant/plant';
import { queryGetAllPlants } from '../../database/plants/queryGetAllPlants';

const router = express.Router();

router.get('/plants', async (req, res) => {
	try {
		const allPlants: Plant[] = (await queryGetAllPlants()) as Plant[];

		return createResponseObject(200, allPlants, res);
	} catch (error) {
		return handleErrors(error, res);
	}
});

export default router;
