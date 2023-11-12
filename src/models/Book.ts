import { db } from '../utils/db';
import { IBookWithId, IBook } from '../interfaces/Book';
import CustomError from '../utils/CustomError';
import logger from '../utils/logger';

const Book = {
	create: async (bookBody: IBook): Promise<IBookWithId> => {
		let book = await db.book.create({
			data: {
				...bookBody,
			},
		});
		logger.info(`Created new Record of Book with id ${book.id}`);
		return book;
	},
	findAll: async (page: number, limit: number): Promise<IBookWithId[]> => {
		let books = await db.book.findMany({
			skip: (page - 1) * limit,
			take: limit,
		});
		logger.info('Fetched All Records of Book');
		return books;
	},
	findById: async (id: string): Promise<IBookWithId> => {
		let book = await db.book.findUnique({
			where: {
				id,
			},
		});
		if (!book) throw new CustomError(`Book with id ${id} not found`, 404);
		logger.info(`Fetched Record of Book with id ${id}`);
		return book;
	},
	findAndUpdate: async (
		id: string,
		body: Partial<IBook>
	): Promise<IBookWithId> => {
		let book = await db.book.findUnique({
			where: {
				id,
			},
		});
		if (!book) throw new CustomError(`Book with id ${id} not found`, 404);

		let updated_book = await db.book.update({
			where: {
				id,
			},
			data: {
				...body,
			},
		});
		logger.info(`Updated Record of Book with id ${id}`);
		return updated_book;
	},
	findAndDelete: async (id: string) => {
		let book = await db.book.findUnique({
			where: {
				id,
			},
		});
		if (!book) throw new CustomError(`Book with id ${id} not found`, 404);
		await db.book.delete({
			where: {
				id,
			},
		});
		logger.info(`Deleted Record of Book with id ${id}`);
	},
	getCount: async (): Promise<number> => {
		let count: number = await db.book.count({});
		return count;
	},
};

export default Book;
