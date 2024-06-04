import { isNullOrUndefined } from '../../common/common';
import { queryPlantByPlantId } from '../../database/plants/queryPlantByPlantId';
import { NotFoundError } from '../../errors/error';
import { Plant } from '../../types/plant/plant';

export const checkIfPlantExists = async (plantId: string): Promise<Plant> => {
	const plant: Plant = (await queryPlantByPlantId(plantId)) as Plant;

	if (isNullOrUndefined(plant)) {
		throw new NotFoundError('Plant not Fount');
	}
	return plant;
};
