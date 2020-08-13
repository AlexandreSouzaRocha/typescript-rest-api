import CandidateDTO from '../models/CandidateDTO';
import logger from '../utils/logger';
import Candidate from '../interfaces/Candidate';
import ErrorFactory from '../errors/ErrorFactory';
import ValidationHandlerFactory from '../factories/ValidationHandlerFactory';
import Constants from '../utils/constants';
import uuidV4 from '../utils/globals';
import ErrorResponse from '../interfaces/ErrorResponse';
import CandidateFilters from '../interfaces/CandidateFilters';
import Connection from '../sequelize';
import { dbpassword } from '../utils/credentialsMiddleware';

class CandidateRepo {
	errorFactory: ErrorFactory;

	errorResponse!: ErrorResponse;

	validationHandlerFactory: ValidationHandlerFactory;

	connection: Connection;

	constructor() {
		this.errorFactory = new ErrorFactory();
		this.validationHandlerFactory = new ValidationHandlerFactory();
		this.connection = Connection.getInstance();
	}

	saveCandidate = async (candidate: Candidate): Promise<CandidateDTO | undefined> => {
		let response: any;
		try {
			this.connection.getConnection(dbpassword()).addModels([CandidateDTO]);
			const {
				address,
				birthDate,
				country,
				cpf,
				fatherName,
				mobileNumber,
				motherName,
				name,
				neighborhood,
				phoneNumber,
				rg,
				schoolName,
				schooling,
				zipCode,
				enrollmentDate,
			} = candidate;

			const createdCandidate: CandidateDTO = new CandidateDTO({
				address,
				birthDate,
				country,
				cpf,
				fatherName,
				motherName,
				mobileNumber,
				name,
				neighborhood,
				phoneNumber,
				rg,
				schoolName,
				schooling,
				zipCode,
				enrollmentDate,
			});
			createdCandidate.addHook('beforeCreate', (attribute: CandidateDTO) => {
				attribute.id = uuidV4;
			});
			response = await createdCandidate.save();

			logger.info({
				event: 'CandidateRepo.saveCandidate',
				candidate: response,
				message: 'Candidate saved.',
			});
		} catch (err) {
			logger.error({
				event: 'CandidateRepo.saveCandidate',
				error: err.message,
			});
			this.errorResponse = {
				message: Constants.MESSAGE.DEFUALT.DATABASE_ERROR,
				requestId: uuidV4,
				statusCode: Constants.HTTPSTATUS.INTERNAL_SERVER_ERROR,
				exceptionType: Constants.EXCEPTION.DATABASE,
			};
			this.errorFactory.getError(this.validationHandlerFactory, this.errorResponse);
		}
		return response;
	};

	findOneByCpf = async (cpf: string): Promise<CandidateDTO | null | undefined> => {
		let candidate: CandidateDTO | null = null;
		try {
			this.connection.getConnection(dbpassword()).addModels([CandidateDTO]);
			candidate = await CandidateDTO.findOne({
				where: {
					cpf,
				},
			});

			logger.info({
				event: 'CandidateRepo.finOneByCpf',
				candidate,
				message: 'Candidate returned.',
			});
		} catch (err) {
			logger.error({
				event: 'CandidateRepo.finOneByCpf',
				error: err.message,
			});
			this.errorResponse = {
				message: Constants.MESSAGE.DEFUALT.DATABASE_ERROR,
				statusCode: Constants.HTTPSTATUS.INTERNAL_SERVER_ERROR,
				requestId: uuidV4,
				exceptionType: Constants.EXCEPTION.DATABASE,
			};
			this.errorFactory.getError(this.validationHandlerFactory, this.errorResponse);
		}
		return candidate;
	};

	finOneByUniqueId = async (uinqueId: string): Promise<CandidateDTO | null | undefined> => {
		let candidate: CandidateDTO | null = null;
		try {
			this.connection.getConnection(dbpassword()).addModels([CandidateDTO]);
			candidate = await CandidateDTO.findOne({
				where: {
					id: uinqueId,
				},
			});

			logger.info({
				event: 'CandidateRepo.finOneByUniqueId',
				message: 'Candidate returned.',
			});

			return candidate;
		} catch (err) {
			logger.error({
				event: 'CandidateRepo.finOneByUniqueId',
				error: err.message,
			});
			this.errorResponse = {
				message: Constants.MESSAGE.DEFUALT.DATABASE_ERROR,
				requestId: uuidV4,
				statusCode: Constants.HTTPSTATUS.INTERNAL_SERVER_ERROR,
				exceptionType: Constants.EXCEPTION.DATABASE,
			};
			this.errorFactory.getError(this.validationHandlerFactory, this.errorResponse);
		}
		return candidate;
	};

	deleteByUniqueId = async (candidate: CandidateDTO): Promise<string | undefined> => {
		logger.info({ event: 'CandidateRepo.deleteByUniqueId' });
		try {
			this.connection.getConnection(dbpassword()).addModels([CandidateDTO]);
			await candidate.update({
				candidateStatus: Constants.CANDIDATE.STATUS.DELETED,
			});
		} catch (err) {
			logger.error({
				event: 'CandidateRepo.deleteByUniqueId',
				error: err.message,
			});
			this.errorResponse = {
				message: Constants.MESSAGE.DEFUALT.DATABASE_ERROR,
				requestId: uuidV4,
				statusCode: Constants.HTTPSTATUS.INTERNAL_SERVER_ERROR,
				exceptionType: Constants.EXCEPTION.DATABASE,
			};
			this.errorFactory.getError(this.validationHandlerFactory, this.errorResponse);
		}
		return candidate.id;
	};

	updateCandidate = async (candidate: Candidate): Promise<CandidateDTO | undefined> => {
		let response: any;
		try {
			this.connection.getConnection(dbpassword()).addModels([CandidateDTO]);
			const {
				address,
				birthDate,
				country,
				cpf,
				fatherName,
				mobileNumber,
				motherName,
				name,
				neighborhood,
				phoneNumber,
				rg,
				schoolName,
				schooling,
				zipCode,
				updatedDate,
			} = candidate;

			const createdCandidate: CandidateDTO = new CandidateDTO({
				address,
				birthDate,
				country,
				cpf,
				fatherName,
				motherName,
				mobileNumber,
				name,
				neighborhood,
				phoneNumber,
				rg,
				schoolName,
				schooling,
				zipCode,
				updatedDate,
			});
			response = await createdCandidate.update(
				{
					address,
					birthDate,
					country,
					cpf,
					fatherName,
					motherName,
					mobileNumber,
					name,
					neighborhood,
					phoneNumber,
					rg,
					schoolName,
					schooling,
					zipCode,
					updatedDate,
				},
				{
					where: {
						cpf,
						rg,
					},
				},
			);

			logger.info({
				event: 'CandidateRepo.updateCandidate',
				candidate: response,
				message: 'Candidate updated.',
			});
		} catch (err) {
			logger.error({
				event: 'CandidateRepo.updateCandidate',
				error: err.message,
			});
			this.errorResponse = {
				message: Constants.MESSAGE.DEFUALT.DATABASE_ERROR,
				requestId: uuidV4,
				statusCode: Constants.HTTPSTATUS.INTERNAL_SERVER_ERROR,
				exceptionType: Constants.EXCEPTION.DATABASE,
			};
			this.errorFactory.getError(this.validationHandlerFactory, this.errorResponse);
		}
		return response;
	};

	findAllByParameters = async (filters: CandidateFilters): Promise<CandidateDTO[] | undefined> => {
		try {
			this.connection.getConnection(dbpassword()).addModels([CandidateDTO]);
			return [];
		} catch (err) {
			logger.error({
				event: 'CandidateRepo.updateCandidate',
				error: err.message,
			});
			this.errorResponse = {
				message: Constants.MESSAGE.DEFUALT.DATABASE_ERROR,
				requestId: uuidV4,
				statusCode: Constants.HTTPSTATUS.INTERNAL_SERVER_ERROR,
				exceptionType: Constants.EXCEPTION.DATABASE,
			};
			this.errorFactory.getError(this.validationHandlerFactory, this.errorResponse);
		}
	};

	findAllHealthCheck = async (): Promise<CandidateDTO[]> => {
		let candidates: {
			count: number;
			rows: CandidateDTO[];
		} = { count: 0, rows: [] };
		try {
			candidates = await CandidateDTO.findAndCountAll();
		} catch (err) {
			logger.error({
				event: 'CandidateRepo.deleteByUniqueId',
				error: err.stack,
			});
			this.errorResponse = {
				message: Constants.MESSAGE.DEFUALT.DATABASE_ERROR,
				requestId: uuidV4,
				statusCode: Constants.HTTPSTATUS.INTERNAL_SERVER_ERROR,
				exceptionType: Constants.EXCEPTION.DATABASE,
			};
			this.errorFactory.getError(this.validationHandlerFactory, this.errorResponse);
		}
		logger.info({ event: 'CandidateRepo.findAllhealthCheck', totalCount: candidates.count });

		return candidates.rows;
	};
}

export default CandidateRepo;
