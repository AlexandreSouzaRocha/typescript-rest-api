/* eslint-disable import/extensions */
import CandidateRepo from '../repositories/CandidateRepo';
import Candidate from '../interfaces/Candidate';
import logger from '../utils/logger';
import ErrorFactory from '../errors/ErrorFactory';
import CandidateModel from '../models/Candidate.model';
import Constants from '../utils/constants';
import Validations from '../validators/Validations';
import ErrorResponse from '../interfaces/ErrorResponse';
import ValidationHandlerFactory from '../factories/ValidationHandlerFactory';
import { requestId } from '../utils/generateRequestId';
import Commons from '../utils/Commons';
import CandidateFilters from '../interfaces/CandidateFilters';

class CandidateService {
	candidateRepo: CandidateRepo;

	errorFactory: ErrorFactory;

	validators: Validations;

	errorResponse!: ErrorResponse;

	validationHandlerFactory: ValidationHandlerFactory;

	commons!: Commons;

	constructor() {
		this.candidateRepo = new CandidateRepo();
		this.errorFactory = new ErrorFactory();
		this.validators = new Validations();
		this.validationHandlerFactory = new ValidationHandlerFactory();
		this.commons = new Commons();
	}

	execCandidateTransactions = async (candidate: Candidate): Promise<any> => {
		try {
			logger.info({
				event: 'CandidateService.execCandidateTransactions',
				candidate,
			});

			await this.validateCandidate(candidate);

			return await this.saveCandidate(candidate);
		} catch (err) {
			logger.error({
				event: 'CandidateService.execCandidateTransactions',
				error: err.message,
			});

			throw err;
		}
	};

	findCandidateByUniqueId = async (uniqueId: string): Promise<Candidate | undefined> => {
		try {
			logger.info({
				event: 'CandidateService.findCandidateByUniqueId',
				uniqueId,
			});

			await this.validators.validateUniqueId(uniqueId);
			const candidate: Candidate | undefined = await this.candidateRepo.finOneByUniqueId(uniqueId);

			if (!candidate) {
				const message: string = Constants.MESSAGE.CANDIDATE_NOT_FOUND.replace('{}', uniqueId);
				logger.error({
					event: 'CandidateService.findCandidateByUniqueId',
					error: message,
				});
				this.errorResponse = {
					message,
					statusCode: Constants.HTTPSTATUS.NOT_FOUND,
					requestId: requestId(),
					exceptionType: Constants.EXCEPTION.CANDIDATE,
				};
				this.errorFactory.getError(this.validationHandlerFactory, this.errorResponse);
			}
			return candidate;
		} catch (err) {
			logger.error({
				event: 'CandidateService.findCandidateByUniqueId',
				error: err.message,
			});

			throw err;
		}
	};

	findCandidateByCpf = async (documentNumber: string): Promise<Candidate | undefined> => {
		try {
			logger.info({
				event: 'CandidateService.findCandidateByUniqueId',
				documentNumber,
			});

			await this.validators.validateCpf(documentNumber);
			const candidate: Candidate | undefined = await this.candidateRepo.findOneByCpf(documentNumber);

			if (!candidate) {
				const message: string = Constants.MESSAGE.CANDIDATE_NOT_FOUND.replace('{}', documentNumber);
				logger.error({
					event: 'CandidateService.findCandidateByCpf',
					error: message,
				});
				this.errorResponse = {
					message,
					statusCode: Constants.HTTPSTATUS.NOT_FOUND,
					requestId: requestId(),
					exceptionType: Constants.EXCEPTION.CANDIDATE,
				};
				this.errorFactory.getError(this.validationHandlerFactory, this.errorResponse);
			}
			return candidate;
		} catch (err) {
			logger.error({
				event: 'CandidateService.findCandidateByUniqueId',
				error: err.message,
			});

			throw err;
		}
	};

	deleteByUniqueId = async (uniqueId: string): Promise<string | undefined> => {
		try {
			const candidate: any = await this.validateDeletition(uniqueId);
			return await this.candidateRepo.deleteByUniqueId(candidate);
		} catch (err) {
			logger.error({
				event: 'CandidateService.findCandidateByUniqueId',
				error: err.message,
			});

			throw err;
		}
	};

	updateCandidate = async (candidate: Candidate): Promise<Candidate | undefined> => {
		try {
			logger.info({
				event: 'CandidateService.updateCandidate',
				candidate,
			});

			const validatedCandidate: Candidate = await this.validators.validateCandidates(candidate);
			validatedCandidate.updatedDate = Commons.getLocaleDate();

			return await this.candidateRepo.updateCandidate(validatedCandidate);
		} catch (err) {
			logger.error({
				event: 'CandidateService.updateCandidate',
				error: err.message,
			});

			throw err;
		}
	};

	findAllCandidatesByFilters = async (candidateFilters: CandidateFilters, { ...query }): Promise<any> => {
		const {
			rg,
			cpf,
			candidateName,
			candidateStatus,
			enrollmentDate,
			scholling,
			uniqueId,
			page,
			limit,
		} = candidateFilters;
		const filterableParams: any = {};
		const pageableParams: any = {};
		filterableParams.rg = rg;
		filterableParams.cpf = cpf;
		filterableParams.candidateName = candidateName;
		filterableParams.candidateStatus = candidateStatus;
		filterableParams.enrollmentDate = enrollmentDate && Commons.getFormatedDate(enrollmentDate);
		filterableParams.scholling = scholling;
		filterableParams.uniqueId = uniqueId;
		filterableParams.limit = limit && Number(limit) <= 20 ? limit : '20';
		filterableParams.page = limit && Number(page) ? page : '0';

		try {
			const validatedFilters = await this.validators.validateFilterableParams(filterableParams, query);

			pageableParams.limit = validatedFilters.limit;
			pageableParams.page = validatedFilters.page;
			pageableParams.offSet = Number(validatedFilters.limit) * Number(validatedFilters.page);

			const candidatesList = await this.candidateRepo.findAllByParameters(filterableParams, pageableParams);

			if (candidatesList && candidatesList.rows.length > 0) {
				const totalPages: number = Math.ceil(candidatesList.count / Number(pageableParams.limit));
				const nextPage: number =
					Number(pageableParams.page) !== totalPages - 1 ? Number(pageableParams.page) + 1 : totalPages - 1;
				const lastPage = !!(totalPages === Number(pageableParams.page));

				return {
					previousPage:
						Number(pageableParams.page) === 0 ? Number(pageableParams.page) : Number(pageableParams.page) - 1,
					currentPage: Number(pageableParams.page),
					nextPage,
					totalPages,
					lastPage,
					totalItems: candidatesList.count,
					maxItemsPerPage: Number(pageableParams.limit),
					totalItemsPerPage: candidatesList.rows.length,
					items: candidatesList.rows,
				};
			}
			return [];
		} catch (err) {
			logger.error({
				event: 'CandidateService.saveCandidate',
				error: err.message,
			});

			throw err;
		}
	};

	private saveCandidate = async (candidate: Candidate): Promise<Candidate | undefined> => {
		try {
			logger.info({
				event: 'CandidateService.saveCandidate',
				candidate,
			});

			return await this.candidateRepo.saveCandidate(candidate);
		} catch (err) {
			logger.error({
				event: 'CandidateService.saveCandidate',
				error: err.message,
			});

			throw err;
		}
	};

	private validateCandidate = async (candidate: Candidate): Promise<Candidate> => {
		try {
			const validatedCandidate: Candidate = await this.validators.validateCandidates(candidate);

			const candidateRepo: Candidate | undefined = await this.candidateRepo.findOneByCpf(validatedCandidate.cpf);

			if (candidateRepo) {
				logger.error({
					event: 'CandidateService.validateCandidate',
					error: 'Candidate alredy exists.',
				});
				this.errorResponse = {
					message: Constants.MESSAGE.CANDIDATE_EXISTS,
					statusCode: Constants.HTTPSTATUS.CONFLICT,
					exceptionType: Constants.EXCEPTION.CANDIDATE_EXISTS,
					requestId: requestId(),
				};
				this.errorFactory.getError(this.validationHandlerFactory, this.errorResponse);
			}

			return validatedCandidate;
		} catch (err) {
			logger.error({
				event: 'CandidateService.validateCandidate',
				error: err.message,
			});

			throw err;
		}
	};

	private async validateDeletition(uniqueId: string): Promise<Candidate | undefined> {
		try {
			const candidate: any = await this.candidateRepo.finOneByUniqueId(uniqueId);

			if (!candidate) {
				logger.error({
					event: 'CandidateRepo.deleteByUniqueId',
					error: Constants.MESSAGE.CANDIDATE_NOT_FOUND.replace('{}', uniqueId),
				});
				this.errorResponse = {
					message: Constants.MESSAGE.CANDIDATE_NOT_FOUND.replace('{}', uniqueId),
					statusCode: Constants.HTTPSTATUS.NOT_FOUND,
					requestId: requestId(),
					exceptionType: Constants.EXCEPTION.CANDIDATE,
				};
				this.errorFactory.getError(this.validationHandlerFactory, this.errorResponse);
			}
			if (candidate.candidateStatus === Constants.CANDIDATE.STATUS.DELETED) {
				logger.error({
					event: 'CandidateRepo.deleteByUniqueId',
					error: Constants.MESSAGE.CANDIDATE_ALREADY_DELETED.replace('{}', uniqueId),
				});
				this.errorResponse = {
					message: Constants.MESSAGE.CANDIDATE_ALREADY_DELETED.replace('{}', uniqueId),
					statusCode: Constants.HTTPSTATUS.CONFLICT,
					requestId: requestId(),
					exceptionType: Constants.EXCEPTION.CANDIDATE,
				};
				this.errorFactory.getError(this.validationHandlerFactory, this.errorResponse);
			}

			return candidate;
		} catch (err) {
			logger.error({
				event: 'CandidateService.validateDeletition',
				error: err.message,
			});
		}
	}
}

export default CandidateService;
