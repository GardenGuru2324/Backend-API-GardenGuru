import express from 'express';

import treflePlants from './plants/treflePlants';
import treflePlantDetails from './plants/treflePlantDetails';
import plant from './plants/getPlantByPlantId';
import plantsOfUser from './plants/getAllPlantsOfUser';
import allPlants from './plants/getAllPlants';
import addPlant from './plants/addPlant';
import deletePlantByPlantId from './plants/deletePlantByPlantId';
import login from './users/postUserByEmail';
import register from './users/addUser';
import user from './users/getUserByUserId';
import updateProfilePicture from './users/updateProfilePicture';
import initializeDatabase from './jest_test_endpoints/initializeDatabase';
import clearDatabase from './jest_test_endpoints/clearDatabase';
import { closeDatabase, connectDatabase } from '../database/db';

const router = express.Router();

// Achter deze API endpoint zitten al de endpoints. {baseUrl}/api/v1/{api-endpoint}
router.get('/', async (req, res) => {
	try {
		await connectDatabase();
		return res.json({
			message: 'API V1',
		});
	} catch (error) {
		return error;
	} finally {
		await closeDatabase();
	}
});

// Hier worden de endpoints gedefinieerd die gebruikt moeten worden door de router.

// Plants
router.use(plant);
router.use(allPlants);
router.use(plantsOfUser);
router.use(addPlant);
router.use(deletePlantByPlantId);

// Trefle service
router.use(treflePlants);
router.use(treflePlantDetails);

// User
router.use(login);
router.use(register);
router.use(user);
router.use(updateProfilePicture);

// Database Seeding
router.use(initializeDatabase);
router.use(clearDatabase);

export default router;
