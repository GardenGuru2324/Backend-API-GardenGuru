import { ObjectId } from 'mongodb';

export interface User {
	_id: ObjectId;
	userId: string;
	userName: string;
	password: string;
	rattingPlaced: boolean;
	profilePicture: string;
	email: string;
	fullName: string;
	accountCreated: number;
}
