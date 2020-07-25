/* eslint-disable import/extensions */
import CandidateRepo from '../repositories/CandidateRepo';
import Candidate from '../interfaces/Candidate';
import { logger } from '../utils/logger';
import ErrorHandler from '../errors/ErrorHandler';
import { CandidateDTO } from '../models/Candidate';
import Constants from '../utils/constants';
import Validations from '../validators/Validations';

class CandidateService {
	candidateRepo: CandidateRepo;

	errHandler: ErrorHandler;

	validators: Validations;

	constructor() {
		this.candidateRepo = new CandidateRepo();
		this.errHandler = new ErrorHandler();
		this.validators = new Validations();
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

	findCandidateByUniqueId = async (uniqueId: string): Promise<any> => {
		try {
			logger.info({
				event: 'CandidateService.findCandidateByUniqueId',
				uniqueId,
			});

			await this.validators.validateUniqueId(uniqueId);
			const candidate = await this.candidateRepo.finOneByUniqueId(uniqueId);

			if (!candidate) {
				const message: string = Constants.MESSAGE.CANDIDATE_NOT_FOUND.replace('{}', uniqueId);
				logger.error({
					event: 'CandidateService.findCandidateByUniqueId',
					error: message,
				});

				this.errHandler.errorHandler(message, Constants.HTTPSTATUS.NOT_FOUND, Constants.EXCEPTION.CANDIDATE);
			}
		} catch (err) {
			logger.error({
				event: 'CandidateService.findCandidateByUniqueId',
				error: err.message,
			});

			throw err;
		}
	};

	private saveCandidate = async (candidate: Candidate): Promise<CandidateDTO | undefined> => {
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

			const candidateRepo: CandidateDTO | null | undefined = await this.candidateRepo.finOneByCpf(
				validatedCandidate.cpf,
			);

			if (candidateRepo) {
				logger.error({
					event: 'CandidateService.validateCandidate',
					error: 'Candidate alredy exists.',
				});

				this.errHandler.errorHandler(
					Constants.MESSAGE.CANDIDATE_EXISTS,
					Constants.HTTPSTATUS.CONFLICT,
					Constants.EXCEPTION.CANDIDATE_EXISTS,
				);
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
}

export default CandidateService;
