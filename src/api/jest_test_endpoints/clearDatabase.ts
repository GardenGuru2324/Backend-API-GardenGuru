import express from 'express';
import { createResponseObject, handleErrors } from '../../common/common';
import { queryClearDatabase } from '../../database/jest_test_querys/queryClearDatabase';

const router = express.Router();

router.get('/clearDatabase', async (req, res) => {
	try {
		await queryClearDatabase();
		return createResponseObject(200, { message: 'Database clear!' }, res);
	} catch (error) {
		return handleErrors(error, res);
	}
});

export default router;
