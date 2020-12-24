import Candidate from 'src/interfaces/Candidate';
import Model from './Database.model';

const SCHEMA = 'gcm_candidate';
const TABLE = 'candidate';

class CandidateModel extends Model {
	constructor() {
		super(SCHEMA, TABLE);
	}

	getResponse(candidate: any) {
		const {
			id,
			address,
			candidate_name,
			birth_date,
			rg,
			cpf,
			mother_name,
			father_name,
			neighborhood,
			zip_code,
			country,
			mobile_number,
			phone_number,
			schooling,
			school_name,
			candidate_status,
			enrollment_date,
		} = candidate;
		const result: Candidate = {
			id,
			address,
			birthDate: birth_date,
			country,
			cpf,
			fatherName: father_name,
			mobileNumber: mobile_number,
			motherName: mother_name,
			name: candidate_name,
			neighborhood,
			phoneNumber: phone_number,
			rg,
			schoolName: school_name,
			schooling,
			zipCode: zip_code,
			enrollmentDate: enrollment_date,
			candidateStatus: candidate_status,
		};
	}
}

export default CandidateModel;
