import { Request, Response } from 'express';
import logger from '../utils/logger';
import Constants from '../utils/constants';
import Commons from '../utils/Commons';
import CustomEventEmitter from '../utils/CustomEventEmitter';
import HealthCheckService from '../services/HealthCheckService';

const healthCheckService: HealthCheckService = new HealthCheckService();

export const getHealth = async (request: Request, response: Response): Promise<Response> => {
	let dateTime = '';
	let isUp = true;

	CustomEventEmitter.once(Constants.EVENT.HEALTH_CHECK, (isDown: any) => {
		logger.info({ event: 'InternalController.getHealth' });

		if (isDown) isUp = false;
	});
	try {
		dateTime = Commons.getLocaleDate();
		isUp = await healthCheckService.getHealth();

		const healthCheck: any = {
			status: 'OK',
			isUp,
			dateTime,
		};

		logger.info({ event: 'InternalController.getHealth', healthCheck });

		return response.status(Constants.HTTPSTATUS.OK).json(healthCheck);
	} catch (err) {
		logger.error({
			event: 'CandidateController.getCandidateByUniqueId',
			error: err.message,
			statusCode: err.statusCode || Constants.HTTPSTATUS.BAD_REQUEST,
		});

		const healthCheckError: any = {
			status: 'NOK',
			isUp,
			dateTime,
		};

		return response.status(Constants.HTTPSTATUS.INTERNAL_SERVER_ERROR).json(healthCheckError);
	}
};
