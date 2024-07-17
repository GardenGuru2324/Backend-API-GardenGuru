import express from 'express';
import { v4 as uuidv4 } from 'uuid';
import { Double } from 'mongodb';

import {
	createResponseObject,
	handleErrors,
} from '../../common/common';
import { validateUser } from '../../common/users/common';
import { queryAddPlant } from '../../database/plants/queryAddPlant';
import { CreatePlant } from '../../types/plant/createPlant';

const router = express.Router();

router.post('/plant', async (req, res) => {
	const {
		plantName,
		locationId,
		plantImage,
		isVegetable,
		plantGrowthHabit,
		plantAvgHeight,
		plantMaxHeight,
		plantGrowthRate,
		plantDaysToHarvest,
		plantRowSpacing,
		plantMinTemp,
		plantMaxTemp,
		userId,
	} = req.body;

	try {
		await validateUser(userId);

		const plantId: string = uuidv4();
		const plantedDate: number = Date.now();
		const plant: CreatePlant = createPlantObject(
			plantId,
			plantName,
			locationId,
			plantImage,
			plantedDate,
			isVegetable,
			plantGrowthHabit,
			plantAvgHeight,
			plantMaxHeight,
			plantGrowthRate,
			plantDaysToHarvest,
			plantRowSpacing,
			plantMinTemp,
			plantMaxTemp,
			userId,
		);

		await queryAddPlant(plant);

		return createResponseObject(
			201,
			{ message: 'Plant successfully added to your profile!' },
			res,
		);
	} catch (error) {
		return handleErrors(error, res);
	}
});

const createPlantObject = (
	plantId: string,
	plantName: string,
	locationId: string,
	plantImage: string,
	plantedDate: number,
	isVegetable: boolean,
	plantGrowthHabit: string,
	plantAvgHeight: Double,
	plantMaxHeight: Double,
	plantGrowthRate: string,
	plantDaysToHarvest: number,
	plantRowSpacing: Double,
	plantMinTemp: number,
	plantMaxTemp: number,
	userId: string,
): CreatePlant => {
	return {
		plantId: plantId,
		plantName: plantName,
		locationId: locationId,
		plantImage: plantImage,
		plantedDate: plantedDate,
		isVegetable: isVegetable,
		plantGrowthHabit: plantGrowthHabit,
		plantAvgHeight: plantAvgHeight,
		plantMaxHeight: plantMaxHeight,
		plantGrowthRate: plantGrowthRate,
		plantDaysToHarvest: plantDaysToHarvest,
		plantRowSpacing: plantRowSpacing,
		plantMinTemp: plantMinTemp,
		plantMaxTemp: plantMaxTemp,
		userId: userId,
	};
};

export default router;
