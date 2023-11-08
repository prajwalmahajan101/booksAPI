import { Request, Response, NextFunction } from 'express';
import logger from './logger';
class CustomError extends Error {
	public statusCode?;
	constructor(public message: string, statusCode: number | undefined = 500) {
		super(message);
		this.statusCode = statusCode;
	}
}

export const errorHandler = (
	err: CustomError,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	logger.error(err.message);
	res.status(err.statusCode ?? 500).json({
		status: false,
		message: err.message,
		data: {},
	});
};

export default CustomError;
