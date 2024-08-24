import express from 'express';
import axios from 'axios';

import 'dotenv/config';

import { createResponseObject, handleErrors } from '../../common/common';

const router = express.Router();

const trefle_api_token: string = process.env.TREFLE_API_TOKEN!;

router.get('/treflePlants', async (req, res) => {
	const page = parseInt(req.query.page as string) || 1;

	try {
		let treflePlants: any[] = [];

		const response = await axios.get(
			`https://trefle.io/api/v1/plants?token=${trefle_api_token}&page=${page}`,
		);
		treflePlants = response.data.data;

		return createResponseObject(200, treflePlants, res);
	} catch (error) {
		return handleErrors(error, res);
	}
});

export default router;
