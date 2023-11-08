import { Router } from 'express';
import {
	createBook,
	deleteBookById,
	getAllBooks,
	getBookById,
	updateBookById,
} from '../../controllers/v1/books';

const router = Router();

router.get('/', getAllBooks);
router.post('/', createBook);
router.get('/:id', getBookById);
router.patch('/:id', updateBookById);
router.delete('/:id', deleteBookById);

export default router;
