import { CandidateDTO } from '../models/Candidate';
import { logger } from '../utils/logger';
import Candidate from '../interfaces/Candidate';
import ErrorHandler from '../errors/ErrorHandler';
import Constants from '../utils/constants';

class CandidateRepo {
	errHandler: ErrorHandler;

	constructor() {
		this.errHandler = new ErrorHandler();
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

			this.errHandler.errorHandler(
				Constants.MESSAGE.DEFUALT.DATABASE_ERROR,
				Constants.HTTPSTATUS.INTERNAL_SERVER_ERROR,
				Constants.EXCEPTION.DATABASE,
			);
		}
		return response;
	};

	finOneByCpf = async (cpf: string): Promise<CandidateDTO | null | undefined> => {
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

			this.errHandler.errorHandler(
				Constants.MESSAGE.DEFUALT.DATABASE_ERROR,
				Constants.HTTPSTATUS.INTERNAL_SERVER_ERROR,
				Constants.EXCEPTION.DATABASE,
			);
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

			this.errHandler.errorHandler(
				Constants.MESSAGE.DEFUALT.DATABASE_ERROR,
				Constants.HTTPSTATUS.INTERNAL_SERVER_ERROR,
				Constants.EXCEPTION.DATABASE,
			);
		}
		return candidate;
	};
}

export default CandidateRepo;
