import { queryGetUserByUserId } from '../../database/users/queryGetUserByUserId';
import { NotFoundError } from '../../errors/error';
import { errorMessages } from '../../errors/errorMessages';
import { User } from '../../types/user/user';

export const validateUser = async (userId: string): Promise<void> => {
	const user: User = (await queryGetUserByUserId(userId)) as User;
	doesUserExist(user);
};

export const doesUserExist = (user: User): void => {
	if (user === null) throw new NotFoundError(errorMessages.userNotFound);
};
