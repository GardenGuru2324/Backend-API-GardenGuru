import { ObjectId } from 'mongodb';

export interface PlantLocation {
	_id: ObjectId;
	locationId: string;
	locationName: string;
}
