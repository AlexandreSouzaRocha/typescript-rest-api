import * as Joi from 'joi';

import Constants from '../utils/constants';
import { validateAsync } from './joi.config';
import { logger } from '../utils/logger';
import ErrorHandler from '../errors/ErrorHandler';

class Validations {
	errHandler: ErrorHandler;

	constructor() {
		this.errHandler = new ErrorHandler();
	}

	validateCandidates = async (model: any) => {
		try {
			const schema: Joi.ObjectSchema = Joi.object()
				.options(Constants.JOI.CONFIG)
				.keys({
					name: Joi.string()
						.regex(Constants.REGEX.NAME)
						.max(128)
						.min(1)
						.strict()
						.error(() => Constants.MESSAGE.INVALID.NAME.replace('{}', 'name')),
					birthDate: Joi.string()
						.max(128)
						.min(1)
						.error(() => Constants.MESSAGE.INVALID.DATE.replace('{}', 'birthDate')),
					rg: Joi.string()
						.max(9)
						.min(9)
						.strict()
						.error(() => Constants.MESSAGE.INVALID.RG),
					cpf: Joi.string()
						.max(128)
						.min(1)
						.error(() => Constants.MESSAGE.INVALID.CPF),
					motherName: Joi.string()
						.regex(Constants.REGEX.NAME)
						.max(128)
						.min(1)
						.strict()
						.error(() => Constants.MESSAGE.INVALID.NAME.replace('{}', 'motherName')),
					fatherName: Joi.string()
						.regex(Constants.REGEX.NAME)
						.max(128)
						.min(1)
						.strict()
						.error(() => Constants.MESSAGE.INVALID.NAME.replace('{}', 'fatherName')),
					address: Joi.string()
						.max(128)
						.min(8)
						.strict()
						.error(() => Constants.MESSAGE.INVALID.ADDRESS),
					neighborhood: Joi.string()
						.max(128)
						.min(1)
						.strict()
						.error(() => Constants.MESSAGE.INVALID.NAME.replace('{}', 'neighborhood')),
					zipCode: Joi.string()
						.regex(Constants.REGEX.ZIP_CODE)
						.max(8)
						.min(8)
						.strict()
						.error(() => Constants.MESSAGE.INVALID.ZIP_CODE),
					country: Joi.string()
						.max(128)
						.min(1)
						.strict()
						.error(() => Constants.MESSAGE.INVALID.COUNTRY),
					mobileNumber: Joi.string()
						.regex(Constants.REGEX.PHONE)
						.max(11)
						.min(8)
						.strict()
						.error(() => Constants.MESSAGE.INVALID.PHONE.replace('{}', 'mobiphoneNumberleNumber')),
					phoneNumber: Joi.string()
						.max(11)
						.min(8)
						.strict()
						.error(() => Constants.MESSAGE.INVALID.PHONE.replace('{}', 'birthDate')),
					schooling: Joi.string()
						.only(Constants.SCHOOLING_STATUS)
						.strict()
						.error(() => Constants.MESSAGE.INVALID.NAME.replace('{}', 'birthDate')),
					schoolName: Joi.string()
						.max(128)
						.min(1)
						.strict()
						.error(() => Constants.MESSAGE.INVALID.NAME.replace('{}', 'schoolName')),
				});

			return await validateAsync(schema, model);
		} catch (err) {
			logger.error({
				event: 'Validations.validateCandidates',
				error: err.details || err.message,
			});

			throw err;
		}
	};

	validateUniqueId = async (uniqueId: string): Promise<any> => {
		try {
			if (!RegExp(Constants.REGEX.UUID).test(uniqueId) && typeof uniqueId !== 'string') {
				logger.error({
					event: 'Validations.validateCandidates',
					error: Constants.MESSAGE.INVALID.UNIQUE_ID,
				});

				this.errHandler.errorHandler(
					Constants.MESSAGE.INVALID.UNIQUE_ID.replace('{}', uniqueId),
					Constants.HTTPSTATUS.BAD_REQUEST,
					Constants.EXCEPTION.VALIDATION,
				);
			}
		} catch (err) {
			throw err;
		}
	};
}

export default Validations;
