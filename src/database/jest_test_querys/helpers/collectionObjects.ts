import { plantLocations } from '../../../data/plantLocations';
import { plantTips } from '../../../data/plantTips';
import { plants } from '../../../data/plants';
import { rating } from '../../../data/ratings';
import { users } from '../../../data/users';

export const collectionsToSeed = [
	{
		collectionName: 'Plants',
		data: plants
	},
	{
		collectionName: 'PlantLocations',
		data: plantLocations
	},
	{
		collectionName: 'PlantTips',
		data: plantTips
	},
	{
		collectionName: 'Ratings',
		data: rating
	},
	{
		collectionName: 'Users',
		data: users
	}
];

export const collectionsToClear = [
	{
		collectionName: 'Plants',
		id: 'plantId'
	},
	{
		collectionName: 'PlantLocations',
		id: 'locationId'
	},
	{
		collectionName: 'PlantTips',
		id: 'tipId'
	},
	{
		collectionName: 'Ratings',
		id: 'ratingId'
	},
	{
		collectionName: 'Users',
		id: 'userId'
	}
];
