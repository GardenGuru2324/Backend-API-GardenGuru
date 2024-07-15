import { queryGetPlantByPlantName } from '../../database/plants/queryGetPlantByPlantName';
import { queryGetPlantByPlantIdAndUserId } from '../../database/plants/queryGetPlantByPlantIdAndUserId';
import { NotFoundError } from '../../errors/error';
import { errorMessages } from '../../errors/errorMessages';
import { Plant } from '../../types/plant/plant';
import { PlantLocation } from '../../types/plantLocation/plantLocation';
import { isNullOrUndefined } from '../common';

export const validatePlant = async (plantName: string): Promise<Plant> => {
	const plant: Plant = (await queryGetPlantByPlantName(plantName)) as Plant;
	doesPlantExist(plant);
	return plant;
};

export const doesPlantExist = (plant: Plant): void => {
	if (isNullOrUndefined(plant))
		throw new NotFoundError(errorMessages.plantNotFound);
};

export const doesPlantLocationExist = (plantLocation: PlantLocation): void => {
	if (isNullOrUndefined(plantLocation))
		throw new NotFoundError(errorMessages.plantLocationNotFound);
};

export const checkIfUserHasPlant = async (
	plantId: string,
	userId: string,
): Promise<void> => {
	const plant: Plant = (await queryGetPlantByPlantIdAndUserId(
		plantId,
		userId,
	)) as Plant;

	if (isNullOrUndefined(plant)) {
		throw new NotFoundError(errorMessages.plantNotFound);
	}
};
