import Express from 'express';
import apiRoutes from './routes';
import logger, { httpLogger } from './utils/logger';
import { errorHandler } from './utils/CustomError';

const main = async () => {
	const app = Express();
	const PORT: number = +(process.env.PORT || 8000);

	// Log Https Requests
	app.use((req, res, next) => {
		const { path } = req;
		httpLogger.http(`Request for ${path}`);
		next();
	});

	// parse Json Body
	app.use(Express.json());
	// Register API Routes
	app.use(apiRoutes);
	// Handle Error
	app.use(errorHandler);

	// Listen to the port

	app.listen(PORT, () => {
		logger.info(`Server started on port ${PORT}`);
	});
};

main().catch((err) => {
	logger.error(err);
});
