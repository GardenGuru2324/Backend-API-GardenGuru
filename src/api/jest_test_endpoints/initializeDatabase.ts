import express from 'express';
import { createResponseObject, handleErrors } from '../../common/common';
import { queryInitializeDatabase } from '../../database/jest_test_querys/queryinitializeDatabase';

const router = express.Router();

router.get('/initializeDatabase/:tableName', async (req, res) => {
	const tableName: string = req.params.tableName;
	try {
		await queryInitializeDatabase(tableName);
		return createResponseObject(200, { message: 'Database seeded!' }, res);
	} catch (error) {
		return handleErrors(error, res);
	}
});

export default router;
