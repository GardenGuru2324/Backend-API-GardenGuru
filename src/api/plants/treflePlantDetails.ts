import express from 'express';
import axios from 'axios';

import 'dotenv/config';

import { createResponseObject, handleErrors } from '../../common/common';

const router = express.Router();

const trefle_api_token: string = process.env.TREFLE_API_TOKEN!;

router.get('/treflePlants/:plantId', async (req, res) => {
	const plantId = req.params.plantId;

	try {
		let treflePlant = {};

		const response = await axios.get(
			`https://trefle.io/api/v1/plants/${plantId}?token=${trefle_api_token}`,
		);
		treflePlant = response.data;

		return createResponseObject(200, treflePlant, res);
	} catch (error) {
		return handleErrors(error, res);
	}
});

export default router;
