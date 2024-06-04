import express from 'express';
import { createResponseObject, handleErrors } from '../../common/common';
import { Plant } from '../../types/plant/plant';
import { queryAllPlants } from '../../database/plants/queryAllPlants';

const router = express.Router();

router.get('/plants', async (req, res) => {
	try {
		const allPlants: Plant[] = (await queryAllPlants()) as Plant[];

		return createResponseObject(200, allPlants, res);
	} catch (error) {
		return handleErrors(error, res);
	}
});

export default router;
