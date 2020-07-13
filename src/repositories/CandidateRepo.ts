import { CandidateDTO } from '../models/Candidate';
import { logger } from '../utils/logger';
import Candidate from '../interfaces/Candidate';

class CandidateRepo {
    constructor() {

    }

    saveCandidate = async (candidate: Candidate) => {
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
                zipCode
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
                zipCode
            });

            const response = await createdCandidate.save();

            logger.info({ event: 'CandidateRepo.saveCandidate', candidate: response, message: 'Candidate saved.' });
        } catch (err) {
            logger.error({ event: 'CandidateRepo.saveCandidate', error: err.message });
        }
    }
}

export default CandidateRepo;