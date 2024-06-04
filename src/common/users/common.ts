import { NotFoundError } from '../../errors/error';
import { errorMessages } from '../../errors/errorMessages';
import { User } from '../../types/user/user';

export const doesUserExist = (user: User) => {
	if (user === null) throw new NotFoundError(errorMessages.userNotFound);
};
