import express from 'express';
import { getUsers } from '../../database/users/users';

const router = express.Router();

router.get('/', async (req, res) => {
	try {
		const data = await getUsers();
		res.json(data);
	} catch (error) {
		return error;
	}
});

export default router;
