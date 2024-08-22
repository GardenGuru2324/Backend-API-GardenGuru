import express from 'express';
import axios from 'axios';

import 'dotenv/config';

import { createResponseObject, handleErrors } from '../../common/common';

const router = express.Router();

const trefle_api_token: string = process.env.TREFLE_API_TOKEN!;

router.get('/treflePlants', async (req, res) => {
	const page = parseInt(req.query.page as string) || 1;
	const plantName: string = req.query.search as string;

	try {
		let treflePlants: any[] = [];
		let response;

		for (let index = 1; index <= 25; index++) {
			response = await axios.get(
				`https://trefle.io/api/v1/plants?token=${trefle_api_token}&page=${index}`,
			);
			treflePlants = [...treflePlants, response.data.data].flat();
		}
		let filtertArray: any[] = [];

		if (plantName !== undefined && plantName !== '') {
			for (let index = 1; index <= 5; index++) {
				let test1: number = 0;
				let test2: number = 50;

				treflePlants = treflePlants
					.slice(test1, test2)
					.filter((plant) => plant.common_name === plantName);

				filtertArray = [...filtertArray, treflePlants];
				test1 += 100;
				test2 += 100;
			}
		}

		const itemsPerPage = 25;
		const startIndex = (page - 1) * itemsPerPage;
		const eindIndex = startIndex + itemsPerPage;
		filtertArray = treflePlants.slice(startIndex, eindIndex);

		return createResponseObject(200, filtertArray, res);
	} catch (error) {
		return handleErrors(error, res);
	}
});

export default router;
