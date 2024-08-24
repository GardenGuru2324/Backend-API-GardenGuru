import { MongoClient } from 'mongodb';

import 'dotenv/config';
import { User } from '../../types/user/user';

const uri: string = process.env.MONGO_CONNECT_URL!;
const database: string = process.env.DATABASE!;
const client = new MongoClient(uri);

export const queryUpdateProfilePicture = async (
	userId: string,
	newProfilePicture: string,
): Promise<User | unknown> => {
	try {
		await client
			.db(database)
			.collection('Users')
			.updateOne(
				{ userId: userId },
				{ $set: { profilePicture: newProfilePicture } },
			);
	} catch (error) {
		return error;
	}
};
