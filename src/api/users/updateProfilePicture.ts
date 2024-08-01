import express from 'express';

import { createResponseObject, handleErrors } from '../../common/common';
import { validateUser } from '../../common/users/common';
import { User } from '../../types/user/user';
import { queryGetUserByUserId } from '../../database/users/queryGetUserByUserId';
import { queryUpdateProfilePicture } from '../../database/users/queryUpdateProfilePicture';

const router = express.Router();

router.put('/user/changeProfilePicture', async (req, res) => {
	const { userId, newProfilePicture } = req.body;
	try {
		await validateUser(userId);
		await queryUpdateProfilePicture(userId, newProfilePicture);

		const updatedUser: User = (await queryGetUserByUserId(userId)) as User;

		return createResponseObject(200, updatedUser, res);
	} catch (error) {
		return handleErrors(error, res);
	}
});

export default router;
