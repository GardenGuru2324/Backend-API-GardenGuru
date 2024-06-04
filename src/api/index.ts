import express from 'express';
import plantsOfUser from './plants/getAllPlantsOfUser';
import allPlants from './plants/getAllPlants';
import deletePlantByPlantId from './plants/deletePlantByPlantId';
import user from './users/getUserByUserId';

const router = express.Router();

// Achter deze API endpoint zitten al de endpoints. {baseUrl}/api/v1/{api-endpoint}
router.get('/', (req, res) => {
	res.json({
		message: 'API V1'
	});
});

// Hier worden de endpoints gedefinieerd die gebruikt moeten worden door de router.
router.use(allPlants);
router.use(plantsOfUser);
router.use(deletePlantByPlantId);
router.use('/user', user);

export default router;
