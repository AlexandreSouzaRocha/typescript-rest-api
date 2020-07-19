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
                enrollmentDate
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
                enrollmentDate
            });

            const response: CandidateDTO = await createdCandidate.save();

            logger.info({
                event: 'CandidateRepo.saveCandidate',
                candidate: response,
                message: 'Candidate saved.'
            });

            return response;
        } catch (err) {
            logger.error({
                event: 'CandidateRepo.saveCandidate',
                error: err.message
            });

            this.errHandler.errorHandler(Constants.MESSAGE.DEFUALT.DATABASE_ERROR,
                Constants.HTTPSTATUS.INTERNAL_SERVER_ERROR, Constants.EXCEPTION.DATABASE);
        }
    }

    finOneByCpf = async (cpf: string): Promise<CandidateDTO | null | undefined> => {
        try {
            const candidate: CandidateDTO | null = await CandidateDTO.findOne({
                where: {
                    cpf
                }
            });

            logger.info({
                event: 'CandidateRepo.finOneByCpf',
                message: 'Candidate returned.'
            });

            return candidate;
        } catch (err) {
            logger.error({
                event: 'CandidateRepo.finOneByCpf',
                error: err.message
            });

            this.errHandler.errorHandler(Constants.MESSAGE.DEFUALT.DATABASE_ERROR,
                Constants.HTTPSTATUS.INTERNAL_SERVER_ERROR, Constants.EXCEPTION.DATABASE);
        }
    }

    finOneByUniqueId = async (uinqueId: string): Promise<CandidateDTO | null | undefined> => {
        try {
            const candidate: CandidateDTO | null = await CandidateDTO.findOne({
                where: {
                    id: uinqueId
                }
            });

            logger.info({
                event: 'CandidateRepo.finOneByUniqueId',
                message: 'Candidate returned.'
            });

            return candidate;
        } catch (err) {
            logger.error({
                event: 'CandidateRepo.finOneByUniqueId',
                error: err.message
            });

            this.errHandler.errorHandler(Constants.MESSAGE.DEFUALT.DATABASE_ERROR,
                Constants.HTTPSTATUS.INTERNAL_SERVER_ERROR, Constants.EXCEPTION.DATABASE);
        }
    }
}

export default CandidateRepo;