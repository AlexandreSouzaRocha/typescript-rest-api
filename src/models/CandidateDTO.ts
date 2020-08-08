import { Model, DataTypes, Sequelize } from 'sequelize';

import Candidate from '../interfaces/Candidate';

class CandidateDTO extends Model<CandidateDTO> implements Candidate {
	id?: string | undefined;

	name!: string;

	birthDate!: string;

	rg!: string;

	cpf!: string;

	motherName!: string;

	fatherName!: string;

	address!: string;

	neighborhood!: string;

	zipCode!: string;

	country!: string;

	mobileNumber!: string;

	phoneNumber!: string;

	schooling!: string;

	schoolName!: string;

	enrollmentDate!: string;

	updatedDate?: string;

	candidateStatus!: string;
}

export default CandidateDTO;
