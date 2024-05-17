import express from 'express';
import { main } from '../db';

const router = express.Router();

router.get('/', async (req, res) => {
	try {
		const data = await main();
		res.json(data);
	} catch (error) {
		console.log(error);
	}
});

export default router;
