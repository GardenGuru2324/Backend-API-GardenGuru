import express from 'express';
import { createResponseObject } from '../../common/common';
import { getPlants } from '../../database/plants/allPlants';

const router = express.Router();

router.get('/', async (req, res) => {
	try {
		const allPlants = await getPlants();

		return createResponseObject(200, allPlants, res);
	} catch (error) {
		return error;
	}
});

export default router;
