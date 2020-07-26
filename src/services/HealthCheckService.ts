import CandidateRepo from '../repositories/CandidateRepo';
import CustomEventEmitter from '../utils/CustomEventEmitter';
import Constants from '../utils/constants';
import logger from '../utils/logger';

class HealthCheckService {
	candidateRepo: CandidateRepo;

	constructor() {
		this.candidateRepo = new CandidateRepo();
	}

	getHealth = async (): Promise<boolean> => {
		try {
			await this.candidateRepo.findAllHealthCheck();

			return true;
		} catch (err) {
			logger.error({
				event: 'HealthCheckService.getHealth',
				error: err.message,
			});
			CustomEventEmitter.emit(Constants.EVENT.HEALTH_CHECK, true);

			throw err;
		}
	};
}

export default HealthCheckService;
