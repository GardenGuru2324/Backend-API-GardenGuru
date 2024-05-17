import express from 'express';
import emojis from './dev';

const router = express.Router();

router.get('/', (req, res) => {
	res.json({
		message: 'API V1'
	});
});

router.use('/dev', emojis);

export default router;
