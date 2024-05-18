import express from 'express';
import { createResponseObject } from '../../common/common';
import { getPlantByPlantId } from '../../database/plants/plantByPlantId';

const router = express.Router();

router.get('/:id', async (req, res) => {
	try {
		const plantId: string = req.params.id;

		const plant = await getPlantByPlantId(plantId);

		return createResponseObject(200, plant, res);
	} catch (error) {
		return error;
	}
});

export default router;
