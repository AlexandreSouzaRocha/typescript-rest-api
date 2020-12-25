import moment from 'moment';

import CandidateModel from '../models/Candidate.model';
import logger from '../utils/logger';
import Candidate from '../interfaces/Candidate';
import ErrorFactory from '../errors/ErrorFactory';
import ValidationHandlerFactory from '../factories/ValidationHandlerFactory';
import Constants from '../utils/constants';
import { requestId } from '../utils/generateRequestId';
import ErrorResponse from '../interfaces/ErrorResponse';
import { dbpassword } from '../utils/credentialsMiddleware';

class CandidateRepo {
	errorFactory: ErrorFactory;

	errorResponse!: ErrorResponse;

	validationHandlerFactory: ValidationHandlerFactory;

	model: CandidateModel;

	constructor() {
		this.errorFactory = new ErrorFactory();
		this.validationHandlerFactory = new ValidationHandlerFactory();
		this.model = new CandidateModel();
	}

	saveCandidate = async (candidate: Candidate): Promise<Candidate | undefined> => {
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
				candidateStatus,
			} = candidate;

			const createdCandidate: any = {
				address,
				candidate_name: name,
				birth_date: birthDate,
				rg,
				cpf,
				mother_name: motherName,
				father_name: fatherName,
				neighborhood,
				zip_code: zipCode,
				country,
				mobile_number: mobileNumber,
				phone_number: phoneNumber,
				schooling,
				school_name: schoolName,
				candidate_status: candidateStatus,
				enrollment_date: enrollmentDate,
			};

			const [row]: any = await this.model.insertInto(createdCandidate);

			logger.info({
				event: 'CandidateRepo.saveCandidate',
				candidate: row,
				message: 'Candidate saved.',
			});

			return this.model.getResponse(row);
		} catch (err) {
			logger.error({
				event: 'CandidateRepo.saveCandidate',
				error: err.message,
			});
			this.errorResponse = {
				message: Constants.MESSAGE.DEFUALT.DATABASE_ERROR,
				requestId: requestId(),
				statusCode: Constants.HTTPSTATUS.INTERNAL_SERVER_ERROR,
				exceptionType: Constants.EXCEPTION.DATABASE,
			};
			this.errorFactory.getError(this.validationHandlerFactory, this.errorResponse);
		}
	};

	findOneByCpf = async (cpf: string): Promise<Candidate | undefined> => {
		try {
			const [row] = await this.model.findOne({ cpf }, '*');
			const candidate: Candidate = this.model.getResponse(row);

			logger.info({
				event: 'CandidateRepo.finOneByCpf',
				candidate,
				message: 'Candidate returned.',
			});

			return candidate;
		} catch (err) {
			logger.error({
				event: 'CandidateRepo.finOneByCpf',
				error: err.message,
			});
			this.errorResponse = {
				message: Constants.MESSAGE.DEFUALT.DATABASE_ERROR,
				statusCode: Constants.HTTPSTATUS.INTERNAL_SERVER_ERROR,
				requestId: requestId(),
				exceptionType: Constants.EXCEPTION.DATABASE,
			};
			this.errorFactory.getError(this.validationHandlerFactory, this.errorResponse);
		}
	};

	finOneByUniqueId = async (uniqueId: string): Promise<Candidate | undefined> => {
		try {
			const [row] = await this.model.findOne({ request_id: uniqueId }, '*');
			const candidate: Candidate = await this.model.getResponse(row);

			logger.info({
				event: 'CandidateRepo.finOneByUniqueId',
				message: 'Candidate returned.',
				candidate,
			});

			return candidate;
		} catch (err) {
			logger.error({
				event: 'CandidateRepo.finOneByUniqueId',
				error: err.message,
			});
			this.errorResponse = {
				message: Constants.MESSAGE.DEFUALT.DATABASE_ERROR,
				requestId: requestId(),
				statusCode: Constants.HTTPSTATUS.INTERNAL_SERVER_ERROR,
				exceptionType: Constants.EXCEPTION.DATABASE,
			};
			this.errorFactory.getError(this.validationHandlerFactory, this.errorResponse);
		}
	};

	deleteByUniqueId = async (candidate: Candidate): Promise<string | undefined> => {
		logger.info({ event: 'CandidateRepo.deleteByUniqueId' });
		try {
			const [row] = await this.model.updateBy(
				{ request_id: candidate.id },
				{ candidate_status: Constants.CANDIDATE.STATUS.DELETED },
			);
			const { id } = this.model.getResponse(row);

			logger.info({
				event: 'CandidateRepo.finOneByUniqueId',
				message: 'Candidate deleted.',
				id,
			});

			return id;
		} catch (err) {
			logger.error({
				event: 'CandidateRepo.deleteByUniqueId',
				error: err.message,
			});
			this.errorResponse = {
				message: Constants.MESSAGE.DEFUALT.DATABASE_ERROR,
				requestId: requestId(),
				statusCode: Constants.HTTPSTATUS.INTERNAL_SERVER_ERROR,
				exceptionType: Constants.EXCEPTION.DATABASE,
			};
			this.errorFactory.getError(this.validationHandlerFactory, this.errorResponse);
		}
	};

	updateCandidate = async (candidate: Candidate): Promise<Candidate | undefined> => {
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
				updatedDate,
			} = candidate;
			const updatedCandidate: any = {
				address,
				candidate_name: name,
				birth_date: birthDate,
				rg,
				cpf,
				mother_name: motherName,
				father_name: fatherName,
				neighborhood,
				zip_code: zipCode,
				country,
				mobile_number: mobileNumber,
				phone_number: phoneNumber,
				schooling,
				school_name: schoolName,
				updated_date: updatedDate,
			};
			const [row] = await this.model.updateBy({ cpf, rg }, updatedCandidate);
			const result: Candidate = this.model.getResponse(row);

			logger.info({
				event: 'CandidateRepo.updateCandidate',
				candidate: result,
				message: 'Candidate updated.',
			});

			return result;
		} catch (err) {
			logger.error({
				event: 'CandidateRepo.updateCandidate',
				error: err.message,
			});
			this.errorResponse = {
				message: Constants.MESSAGE.DEFUALT.DATABASE_ERROR,
				requestId: requestId(),
				statusCode: Constants.HTTPSTATUS.INTERNAL_SERVER_ERROR,
				exceptionType: Constants.EXCEPTION.DATABASE,
			};
			this.errorFactory.getError(this.validationHandlerFactory, this.errorResponse);
		}
	};

	findAllByParameters = async (filters: any, pageableParams: any): Promise<any> => {
		const params: any = {};
		let whereBetween: any;
		let from: string | undefined;
		let to: string | undefined;
		try {
			logger.info({ event: 'CandidateRepo.findAllByParameters', filters, pageableParams });
			params.cpf = filters.cpf;
			params.rg = filters.rg;
			params.uniqueId = filters.uniqueId;
			params.enrollment_date = filters.enrollmenDate;
			params.schooling = filters.schooling;
			params.candidate_name = filters.name;
			params.candidate_status = filters.candidateStatus;
			from = params.enrollment_date ? moment(filters.enrollmenDate).format(Constants.DATE_TIME.FORMAT) : undefined;
			to = from ? moment(filters.enrollmenDate).subtract(1, 'days').format(Constants.DATE_TIME.FORMAT) : undefined;
			Object.keys(params).forEach((key) => typeof key === undefined && delete params[key]);
			if (from && to) {
				whereBetween = {};
				whereBetween.from = from;
				whereBetween.to = to;
			}
			const rows: any[] = await this.model.findByFilterableParams(params, pageableParams, whereBetween);

			logger.info({ event: 'CandidateRepo.updateCandidate', totalCount: rows.length });

			return this.model.getResponseList(rows);
		} catch (err) {
			logger.error({
				event: 'CandidateRepo.updateCandidate',
				error: err.message,
			});
			this.errorResponse = {
				message: Constants.MESSAGE.DEFUALT.DATABASE_ERROR,
				requestId: requestId(),
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
			this.model.getConnection(dbpassword()).addModels([CandidateDTO]);
			candidates = await CandidateDTO.findAndCountAll();
		} catch (err) {
			logger.error({
				event: 'CandidateRepo.deleteByUniqueId',
				error: err.stack,
			});
			this.errorResponse = {
				message: Constants.MESSAGE.DEFUALT.DATABASE_ERROR,
				requestId: requestId(),
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
