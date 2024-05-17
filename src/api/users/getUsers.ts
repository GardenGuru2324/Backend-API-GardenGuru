import express from 'express';
import { getUsers } from '../../database/users/allUsers';
import { createResponseObject } from '../../common/common';

const router = express.Router();

router.get('/', async (req, res) => {
	try {
		const allUsers = await getUsers();

		return createResponseObject(200, allUsers, res);
	} catch (error) {
		return error;
	}
});

export default router;
