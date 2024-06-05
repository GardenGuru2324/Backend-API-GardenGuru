import express from 'express';
import { createResponseObject, handleErrors } from '../../common/common';
import { queryInitializeDatabase } from '../../database/jest_test_querys/queryinitializeDatabase';

const router = express.Router();

router.get('/initializeDatabase', async (req, res) => {
	try {
		await queryInitializeDatabase();
		return createResponseObject(200, { message: 'Database seeded!' }, res);
	} catch (error) {
		return handleErrors(error, res);
	}
});

export default router;
