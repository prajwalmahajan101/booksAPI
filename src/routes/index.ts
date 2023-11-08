import { Router } from 'express';
import v1Routes from './v1';
const router = Router();

router.get('/', (req, res) => {
	res.status(200).json({ msg: 'API Working Properly' });
});

router.use('/v1', v1Routes);

export default router;
