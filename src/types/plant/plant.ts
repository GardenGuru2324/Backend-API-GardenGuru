import { ObjectId } from 'mongodb';

export interface Plant {
	_id: ObjectId;
	plantId: string;
	plantName: string;
	locationId: string;
	plantImage: string;
	plantedDate: number;
	userId: string;
}
