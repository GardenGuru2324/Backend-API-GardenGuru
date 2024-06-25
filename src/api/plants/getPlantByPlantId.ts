import express from 'express';

import { createResponseObject, handleErrors } from '../../common/common';
import { Plant } from '../../types/plant/plant';
import { queryGetPlantByPlantId } from '../../database/plants/queryGetPlantByPlantId';
import { doesPlantExist } from '../../common/plants/common';

const router = express.Router();

router.get('/plants/:plantId', async (req, res) => {
	const plantId = req.params.plantId;
	try {
		const plant: Plant = (await queryGetPlantByPlantId(plantId)) as Plant;

		doesPlantExist(plant);

		return createResponseObject(200, plant, res);
	} catch (error) {
		return handleErrors(error, res);
	}
});

export default router;
