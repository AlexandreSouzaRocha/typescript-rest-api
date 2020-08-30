import * as Joi from 'joi';

import logger from '../utils/logger';

export const validateAsync = async <T>(schema: Joi.ObjectSchema, model: T): Promise<T> => {
	try {
		logger.info({ event: 'validateAsync', model });

		return await schema.validate(model);
	} catch (err) {
		logger.error({ event: 'validateAsync.err', error: err.details || err.message });

		throw err;
	}
};
