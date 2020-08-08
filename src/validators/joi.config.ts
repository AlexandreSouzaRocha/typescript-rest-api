import * as Joi from 'joi';

import logger from '../utils/logger';

export const validateAsync = async (schema: Joi.ObjectSchema, model: any): Promise<any> => {
	try {
		logger.info({ event: 'validateAsync', model });

		return await schema.validate(model);
	} catch (err) {
		logger.error({ event: 'validateAsync.err', error: err.details || err.message });

		throw err;
	}
};
