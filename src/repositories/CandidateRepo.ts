import CandidateDTO from '../models/Candidate';
import logger from '../utils/logger';
import Candidate from '../interfaces/Candidate';
import ErrorFactory from '../errors/ErrorFactory';
import ValidationHandlerFactory from '../factories/ValidationHandlerFactory';
import Constants from '../utils/constants';
import uuidV4 from '../utils/globals';
import ErrorResponse from '../interfaces/ErrorResponse';

class CandidateRepo {
	errorFactory: ErrorFactory;

	errorResponse!: ErrorResponse;

	validationHandlerFactory: ValidationHandlerFactory;

	constructor() {
		this.errorFactory = new ErrorFactory();
		this.validationHandlerFactory = new ValidationHandlerFactory();
	}

	saveCandidate = async (candidate: Candidate): Promise<CandidateDTO | undefined> => {
		let response: any;
		try {
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
		try {
			logger.info({ event: 'CandidateRepo.deleteByUniqueId' });

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

	findAllHealthCheck = async (): Promise<CandidateDTO[]> => {
		let candidates: CandidateDTO[] = [];
		try {
			candidates = await CandidateDTO.findAll();
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
		return candidates;
	};
}

export default CandidateRepo;
