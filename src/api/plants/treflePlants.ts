import express from 'express';
import axios from 'axios';

import 'dotenv/config';

import { createResponseObject, handleErrors } from '../../common/common';

const router = express.Router();

const trefle_api_token: string = process.env.TREFLE_API_TOKEN!;

router.get('/treflePlants', async (req, res) => {
	const page = parseInt(req.query.page as string) || 1;
	const plantName: string | undefined = req.query.search as
		| string
		| undefined;
	try {
		const response = await axios.get(
			`https://trefle.io/api/v1/plants?token=${trefle_api_token}&page=${page}`,
		);

		let treflePlants = response.data.data;

		if (plantName !== undefined && plantName !== '') {
			treflePlants = treflePlants.filter(
				(plant: { common_name: string }) =>
					plant.common_name
						.toLowerCase()
						.includes(plantName.toLowerCase()),
			);
		}

		return createResponseObject(200, treflePlants, res);
	} catch (error) {
		return handleErrors(error, res);
	}
});

export default router;
