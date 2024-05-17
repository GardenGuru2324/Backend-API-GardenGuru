import express from 'express';
import users from './users/getUsers';
import user from './users/getUserByUserId';

const router = express.Router();

// Achter deze API endpoint zitten al de endpoints. {baseUrl}/api/v1/{api-endpoint}
router.get('/', (req, res) => {
	res.json({
		message: 'API V1'
	});
});

// Hier worden de endpoints gedefinieerd.
router.use('/users', users);
router.use('/users', user);

export default router;
