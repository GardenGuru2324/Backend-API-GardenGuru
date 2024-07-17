import express from 'express';

import plant from './plants/getPlantByPlantId';
import plantsOfUser from './plants/getAllPlantsOfUser';
import allPlants from './plants/getAllPlants';
import addPlant from './plants/addPlant';
import deletePlantByPlantId from './plants/deletePlantByPlantId';
import login from './users/postUserByEmail';
import register from './users/addUser';
import user from './users/getUserByUserId';
import initializeDatabase from './jest_test_endpoints/initializeDatabase';
import clearDatabase from './jest_test_endpoints/clearDatabase';

const router = express.Router();

// Achter deze API endpoint zitten al de endpoints. {baseUrl}/api/v1/{api-endpoint}
router.get('/', (req, res) => {
	res.json({
		message: 'API V1',
	});
});

// Hier worden de endpoints gedefinieerd die gebruikt moeten worden door de router.

// Plants
router.use(plant);
router.use(allPlants);
router.use(plantsOfUser);
router.use(addPlant);
router.use(deletePlantByPlantId);

// User
router.use(login);
router.use(register);
router.use(user);

// Database Seeding
router.use(initializeDatabase);
router.use(clearDatabase);

export default router;
