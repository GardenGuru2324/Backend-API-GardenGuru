import express from 'express';

import { createResponseObject, handleErrors } from '../../common/common';
import { validateUser } from '../../common/users/common';
import { User } from '../../types/user/user';
import { queryGetUserByUserId } from '../../database/users/queryGetUserByUserId';

const router = express.Router();

router.get('/user/:userId', async (req, res) => {
	const userId = req.params.userId;
	try {
		await validateUser(userId);

		const foundUser: User = (await queryGetUserByUserId(userId)) as User;

		const user = createUserDisplayObject(foundUser);

		return createResponseObject(200, user, res);
	} catch (error) {
		return handleErrors(error, res);
	}
});
// eslint-disable-next-line @typescript-eslint/explicit-function-return-type
const createUserDisplayObject = (foundUser: User) => {
	return {
		fullName: foundUser.fullName,
		email: foundUser.email,
		profilePicture: foundUser.profilePicture,
		accountCreated: foundUser.accountCreated,
	};
};

export default router;
