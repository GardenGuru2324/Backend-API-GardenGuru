import express from 'express';

import { createResponseObject, handleErrors } from '../../common/common';
import { queryGetAllPlantsOfUser } from '../../database/plants/queryGetAllPlantsOfUser';
import { ConflictError } from '../../errors/error';
import { errorMessages } from '../../errors/errorMessages';
import { validateUser } from '../../common/users/common';
import { PlantLocation } from '../../types/plantLocation/plantLocation';
import { queryGetPlantLocationByLocationName } from '../../database/plantLocations/queryGetPlantLocationByLocationName';
import { doesPlantLocationExist } from '../../common/plants/common';
import { Query } from '../../types/Query';
import { UserPlant } from '../../types/plant/userPlants';

const router = express.Router();

router.get('/user/:userId/plants', async (req, res) => {
	const userId = req.params.userId;
	const plantLocationName: string | undefined = req.query.location as
		| string
		| undefined;
	const plantName: string | undefined = req.query.search as
		| string
		| undefined;
	const page = parseInt(req.query.page as string) || 1;
	try {
		await validateUser(userId);

		const query: Query = { userId: userId };

		if (plantName !== undefined && plantName !== '') {
			query.plantName = { $regex: plantName, $options: 'i' };
		}

		if (plantLocationName !== undefined && plantLocationName !== '') {
			const plantLocation: PlantLocation =
				await validatePlantLocation(plantLocationName);
			query.locationId = plantLocation.locationId;
		}

		const allPlantsOfUser: UserPlant = (await queryGetAllPlantsOfUser(
			query,
			page,
		)) as UserPlant;

		plantLocationName && checkIfUserHasPlantsOfLocation(allPlantsOfUser);

		checkIfUserHasPlants(allPlantsOfUser);

		return createResponseObject(200, allPlantsOfUser, res);
	} catch (error) {
		return handleErrors(error, res);
	}
});

const validatePlantLocation = async (
	locationName: string,
): Promise<PlantLocation> => {
	const plantLocation: PlantLocation =
		(await queryGetPlantLocationByLocationName(
			locationName,
		)) as PlantLocation;
	doesPlantLocationExist(plantLocation);
	return plantLocation;
};

const checkIfUserHasPlants = (allPlantsOfUser: UserPlant): void => {
	if (allPlantsOfUser.userPlants.length === 0) {
		throw new ConflictError(errorMessages.userHasNoPlants);
	}
};

const checkIfUserHasPlantsOfLocation = (
	allPlantsOfUserOfLocation: UserPlant,
): void => {
	if (allPlantsOfUserOfLocation.userPlants.length === 0)
		throw new ConflictError(errorMessages.userHasNoPlantsOfLocation);
};

export default router;
