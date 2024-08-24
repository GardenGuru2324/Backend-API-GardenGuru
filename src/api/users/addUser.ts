import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import bcrypt from 'bcrypt';
import validate from 'deep-email-validator';

import { createResponseObject, handleErrors } from '../../common/common';
import { User } from '../../types/user/user';
import { CreateUser } from '../../types/user/createUser';
import { queryAddUser } from '../../database/users/queryAddUser';
import { ConflictError, UnprocessableContentError } from '../../errors/error';
import { errorMessages } from '../../errors/errorMessages';
import { queryGetUserByEmail } from '../../database/users/queryGetUserByEmail';
import { queryGetUserByUserId } from '../../database/users/queryGetUserByUserId';

const router = express.Router();

router.post('/register', async (req, res) => {
	const { email, fullName, password } = req.body;

	try {
		await validateEmail(email);
		await doesUserAlreadyExist(email);

		const userId: string = uuidv4();
		const profilePicture = getRandomProfile();
		const hashPassword: string = await bcrypt.hash(password, 3);
		const accountCreated: number = Date.now();
		const createUser: CreateUser = createUserObject(
			userId,
			profilePicture,
			hashPassword,
			email,
			fullName,
			accountCreated,
		);

		await queryAddUser(createUser);
		const createdUser: User = (await queryGetUserByUserId(userId)) as User;

		return createResponseObject(201, createdUser, res);
	} catch (error) {
		return handleErrors(error, res);
	}
});

const getRandomProfile = (): string => {
	let posibleProfilePictures: string[] = [
		'https://i.ibb.co/VD75cfm/plant-vector-1.jpg',
		'https://i.ibb.co/3BQdNXh/plant-vector-2.jpg',
		'https://i.ibb.co/d56yVjt/plant-vector-3.jpg',
	];
	const randomNumber: number = Math.floor(
		Math.random() * posibleProfilePictures.length,
	);
	return posibleProfilePictures[randomNumber];
};

const createUserObject = (
	userId: string,
	profilePicture: string,
	password: string,
	email: string,
	fullName: string,
	accountCreated: number,
): CreateUser => {
	return {
		userId: userId,
		profilePicture: profilePicture,
		password: password,
		email: email,
		fullName: fullName,
		accountCreated: accountCreated,
	};
};

const validateEmail = async (email: string): Promise<void> => {
	const validateEmail = await validate({ email: email, validateSMTP: false });
	const isEmailValid: boolean = validateEmail.valid;

	if (!isEmailValid)
		throw new UnprocessableContentError(errorMessages.invalidEmail);
};

const doesUserAlreadyExist = async (email: string): Promise<void> => {
	const foundUser: User = (await queryGetUserByEmail(email)) as User;

	if (foundUser !== null)
		throw new ConflictError(errorMessages.userAlreadyExist);
};

export default router;
