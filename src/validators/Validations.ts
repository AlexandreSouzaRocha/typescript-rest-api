import * as Joi from 'joi';
import moment from 'moment';

import Constants from '../utils/constants';
import { validateAsync } from './joi.config';
import logger from '../utils/logger';
import ErrorFactory from '../errors/ErrorFactory';
import ErrorResponse from '../interfaces/ErrorResponse';
import ValidationHandlerFactory from '../factories/ValidationHandlerFactory';
import { requestId } from '../utils/generateRequestId';

class Validations {
	errorFactory: ErrorFactory;

	errorResponse!: ErrorResponse;

	validationHandlerFactory: ValidationHandlerFactory;

	constructor() {
		this.errorFactory = new ErrorFactory();
		this.validationHandlerFactory = new ValidationHandlerFactory();
	}

	validateCandidates = async (model: any): Promise<any> => {
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
			this.errorResponse = {
				message: err.details,
				statusCode: Constants.HTTPSTATUS.BAD_REQUEST,
				requestId: requestId(),
				exceptionType: Constants.EXCEPTION.VALIDATION,
			};
			this.errorFactory.getError(this.validationHandlerFactory, this.errorResponse);
		}
	};

	validateUniqueId = async (uniqueId: string): Promise<any> => {
		if (!RegExp(Constants.REGEX.UUID).test(uniqueId) && typeof uniqueId !== 'string') {
			logger.error({
				event: 'Validations.validateCandidates',
				error: Constants.MESSAGE.INVALID.UNIQUE_ID,
			});
			this.errorResponse = {
				message: Constants.MESSAGE.INVALID.UNIQUE_ID.replace('{}', uniqueId),
				statusCode: Constants.HTTPSTATUS.BAD_REQUEST,
				exceptionType: Constants.EXCEPTION.VALIDATION,
				requestId: requestId(),
			};
			this.errorFactory.getError(this.validationHandlerFactory, this.errorResponse);
		}
	};

	validateCpf = async (documentNumber: string): Promise<any> => {
		if (!RegExp(Constants.REGEX.CPF).test(documentNumber) && typeof documentNumber !== 'string') {
			logger.error({
				event: 'Validations.validateCandidates',
				error: Constants.MESSAGE.INVALID.CPF,
			});
			this.errorResponse = {
				message: Constants.MESSAGE.INVALID.CPF,
				statusCode: Constants.HTTPSTATUS.BAD_REQUEST,
				exceptionType: Constants.EXCEPTION.VALIDATION,
				requestId: requestId(),
			};
			this.errorFactory.getError(this.validationHandlerFactory, this.errorResponse);
		}
	};

	validateFilterableParams = async (filters: any, { ...query }): Promise<any> => {
		try {
			const { rg, cpf, enrollmentDate, schooling, candidateStatus, candidateName, page, limit } = filters;
			Object.keys(query).forEach((param) => {
				if (Constants.ALLOWED_FILTERS.includes(param)) {
					logger.error({
						event: 'Validations.validateFilterableParams',
						message: Constants.MESSAGE.INVALID.FILTER.replace('{}', query[param]),
					});

					this.errorResponse = {
						message: Constants.MESSAGE.INVALID.FILTER.replace('{}', query[param]),
						statusCode: Constants.HTTPSTATUS.BAD_REQUEST,
						exceptionType: Constants.EXCEPTION.VALIDATION,
						requestId: requestId(),
					};
					this.errorFactory.getError(this.validationHandlerFactory, this.errorResponse);
				}
			});

			if (rg && !RegExp(Constants.REGEX.RG).test(rg)) {
				logger.error({
					event: 'Validations.validateFilterableParams',
					message: Constants.MESSAGE.INVALID.RG,
				});

				this.errorResponse = {
					message: Constants.MESSAGE.INVALID.RG,
					statusCode: Constants.HTTPSTATUS.BAD_REQUEST,
					exceptionType: Constants.EXCEPTION.VALIDATION,
					requestId: requestId(),
				};
				this.errorFactory.getError(this.validationHandlerFactory, this.errorResponse);
			}

			if (cpf && !RegExp(Constants.REGEX.CPF).test(cpf)) {
				logger.error({
					event: 'Validations.validateFilterableParams',
					message: Constants.MESSAGE.INVALID.CPF,
				});

				this.errorResponse = {
					message: Constants.MESSAGE.INVALID.CPF,
					statusCode: Constants.HTTPSTATUS.BAD_REQUEST,
					exceptionType: Constants.EXCEPTION.VALIDATION,
					requestId: requestId(),
				};
				this.errorFactory.getError(this.validationHandlerFactory, this.errorResponse);
			}
			if (enrollmentDate && !moment(enrollmentDate, Constants.DATE_TIME.FORMAT).isValid()) {
				logger.error({
					event: 'Validations.validateFilterableParams',
					message: Constants.MESSAGE.INVALID.CPF,
				});

				this.errorResponse = {
					message: Constants.MESSAGE.INVALID.ENROLLMENT_DATE,
					statusCode: Constants.HTTPSTATUS.BAD_REQUEST,
					exceptionType: Constants.EXCEPTION.VALIDATION,
					requestId: requestId(),
				};
				this.errorFactory.getError(this.validationHandlerFactory, this.errorResponse);
			}
			if (schooling && !Constants.SCHOOLING_STATUS.includes(schooling)) {
				logger.error({
					event: 'Validations.validateFilterableParams',
					message: Constants.MESSAGE.INVALID.SCHOOLING,
				});

				this.errorResponse = {
					message: Constants.MESSAGE.INVALID.SCHOOLING,
					statusCode: Constants.HTTPSTATUS.BAD_REQUEST,
					exceptionType: Constants.EXCEPTION.VALIDATION,
					requestId: requestId(),
				};
				this.errorFactory.getError(this.validationHandlerFactory, this.errorResponse);
			}
			if (candidateStatus && !['APPROVED', 'DISAPPROVED', 'DELETED'].includes(candidateStatus)) {
				logger.error({
					event: 'Validations.validateFilterableParams',
					message: Constants.MESSAGE.INVALID.CANDIDATE_STATUS.replace('{}', candidateStatus),
				});

				this.errorResponse = {
					message: Constants.MESSAGE.INVALID.SCHOOLING,
					statusCode: Constants.HTTPSTATUS.BAD_REQUEST,
					exceptionType: Constants.EXCEPTION.VALIDATION,
					requestId: requestId(),
				};
				this.errorFactory.getError(this.validationHandlerFactory, this.errorResponse);
			}
			if (candidateName && !RegExp(Constants.REGEX.NAME).test(candidateName)) {
				logger.error({
					event: 'Validations.validateFilterableParams',
					message: Constants.MESSAGE.INVALID.NAME.replace('{}', 'candidateName'),
				});

				this.errorResponse = {
					message: Constants.MESSAGE.INVALID.NAME.replace('{}', 'candidateName'),
					statusCode: Constants.HTTPSTATUS.BAD_REQUEST,
					exceptionType: Constants.EXCEPTION.VALIDATION,
					requestId: requestId(),
				};
				this.errorFactory.getError(this.validationHandlerFactory, this.errorResponse);
			}
			if (limit && !RegExp(Constants.REGEX.NUMBER).test(limit)) {
				logger.error({
					event: 'Validations.validateFilterableParams',
					message: Constants.MESSAGE.INVALID.PAGEABLE_PARAM.replace('{}', 'limit'),
				});

				this.errorResponse = {
					message: Constants.MESSAGE.INVALID.PAGEABLE_PARAM.replace('{}', 'limit'),
					statusCode: Constants.HTTPSTATUS.BAD_REQUEST,
					exceptionType: Constants.EXCEPTION.VALIDATION,
					requestId: requestId(),
				};
				this.errorFactory.getError(this.validationHandlerFactory, this.errorResponse);
			}
			if (page && !RegExp(Constants.REGEX.NUMBER).test(page)) {
				logger.error({
					event: 'Validations.validateFilterableParams',
					message: Constants.MESSAGE.INVALID.PAGEABLE_PARAM.replace('{}', 'page'),
				});

				this.errorResponse = {
					message: Constants.MESSAGE.INVALID.PAGEABLE_PARAM.replace('{}', 'page'),
					statusCode: Constants.HTTPSTATUS.BAD_REQUEST,
					exceptionType: Constants.EXCEPTION.VALIDATION,
					requestId: requestId(),
				};
				this.errorFactory.getError(this.validationHandlerFactory, this.errorResponse);
			}

			Object.keys(filters).forEach((filter) => typeof filter === 'undefined' && delete filters[filter]);

			return filters;
		} catch (err) {
			logger.error({ event: 'Validations.validateFilterableParams', error: err.message });

			throw err;
		}
	};
}

export default Validations;
