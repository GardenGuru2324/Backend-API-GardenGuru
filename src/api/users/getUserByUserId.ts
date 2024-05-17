import express from 'express';
import { ObjectId } from 'mongodb';
import { userById } from '../../database/users/userById';
import { createResponseObject } from '../../common/common';

const router = express.Router();

router.get('/:id', async (req, res) => {
	try {
		const userId: ObjectId = new ObjectId(req.params.id);

		const user = await userById(userId);

		return createResponseObject(200, user, res);
	} catch (error) {
		return error;
	}
});

export default router;
