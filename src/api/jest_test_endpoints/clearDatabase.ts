import express from 'express';
import { createResponseObject, handleErrors } from '../../common/common';
import { queryClearDatabase } from '../../database/jest_test_querys/queryClearDatabase';

const router = express.Router();

router.get('/:tableName/clearDatabase', async (req, res) => {
	const tableName: string = req.params.tableName;
	try {
		await queryClearDatabase(tableName);
		return createResponseObject(200, { message: 'Database clear!' }, res);
	} catch (error) {
		return handleErrors(error, res);
	}
});

export default router;
