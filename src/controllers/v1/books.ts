import { Request, Response, NextFunction } from 'express';
import Joi from 'joi';

import Book from '../../models/Book';
import { IBook } from '../../interfaces/Book';
import CustomError from '../../utils/CustomError';

export const getAllBooks = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const books = await Book.findAll();

	return res.status(200).json({
		status: true,
		message: 'Successfully Fetched List of Books',
		data: {
			books,
		},
	});
};

export const createBook = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const body = req.body;
		const BookCreateSchema = Joi.object({
			title: Joi.string().trim().min(5).max(256).required(),
			author: Joi.string().trim().min(5).max(256).required(),
			summary: Joi.string().trim().min(0).max(512).optional().default(''),
		});

		const validatedBody = (await BookCreateSchema.validateAsync(
			body
		)) as IBook;

		const book = await Book.create(validatedBody);

		return res.status(201).json({
			status: true,
			message: 'Successfully Created Record For A Book',
			data: {
				book: book,
			},
		});
	} catch (err: any) {
		if (err._original) {
			next(new CustomError(err.message, 400));
		}
		next(err);
	}
};

export const getBookById = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const { id } = req.params;
		const ObjectIdSchema = Joi.string()
			.trim()
			.hex()
			.length(24)
			.message('Please Provide Valid ObjectId');

		// Validate id for ObjectId

		const valid_id = await ObjectIdSchema.validateAsync(id);

		const book = await Book.findById(valid_id);

		return res.status(200).json({
			status: true,
			message: 'Successfully Fetched Details of the Book',
			data: {
				book: book,
			},
		});
	} catch (err: any) {
		if (err._original) {
			next(new CustomError(err.message, 400));
		}
		next(err);
	}
};

export const updateBookById = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const { id } = req.params;
		const { body } = req;
		const ObjectIdSchema = Joi.string()
			.trim()
			.hex()
			.length(24)
			.message('Please Provide Valid ObjectId');
		const BookUpdateSchema = Joi.object({
			title: Joi.string().trim().min(5).max(256).optional(),
			author: Joi.string().trim().min(5).max(256).optional(),
			summary: Joi.string().trim().min(0).max(512).optional(),
		});

		// Validate id for ObjectId
		const valid_id = await ObjectIdSchema.validateAsync(id);
		const validatedBody = (await BookUpdateSchema.validateAsync(
			body
		)) as Partial<IBook>;
		let updated_book = await Book.findAndUpdate(id, validatedBody);
		return res.status(200).json({
			status: true,
			message: `Successfully Update The Record with id ${valid_id}`,
			data: {
				updated_book,
			},
		});
	} catch (err) {
		next(err);
	}
};

export const deleteBookById = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const { id } = req.params;

		// Validate id for ObjectId
		const ObjectIdSchema = Joi.string()
			.trim()
			.hex()
			.length(24)
			.message('Please Provide Valid ObjectId');
		const valid_id = await ObjectIdSchema.validateAsync(id);

		await Book.findAndDelete(valid_id);

		return res.status(200).json({
			status: true,
			message: `Successfully Deleted Record with id ${valid_id}`,
			data: {
				deleted_id: valid_id,
			},
		});
	} catch (err: any) {
		if (err._original) {
			next(new CustomError(err.message, 400));
		}
		next(err);
	}
};
