import { Model, DataType, Column, Table } from 'sequelize-typescript';

import Candidate from '../interfaces/Candidate';

@Table({ modelName: 'CandidateDTO', tableName: 'candidate', schema: 'gcm_candidate' })
class CandidateDTO extends Model<CandidateDTO> implements Candidate {
	@Column({ type: DataType.STRING(64), primaryKey: true, field: 'id' })
	id?: string | undefined;

	@Column({ type: DataType.STRING(128), field: 'candidate_name' })
	name!: string;

	@Column({ type: DataType.STRING(32), field: 'birth_date' })
	birthDate!: string;

	@Column({ type: DataType.STRING(16), field: 'rg' })
	rg!: string;

	@Column({ type: DataType.STRING(32), field: 'cpf' })
	cpf!: string;

	@Column({ type: DataType.STRING(128), field: 'mother_name' })
	motherName!: string;

	@Column({ type: DataType.STRING(128), field: 'father_name' })
	fatherName!: string;

	@Column({ type: DataType.STRING(128), field: 'address' })
	address!: string;

	@Column({ type: DataType.STRING(128), field: 'neighborhood' })
	neighborhood!: string;

	@Column({ type: DataType.STRING(8), field: 'zip_code' })
	zipCode!: string;

	@Column({ type: DataType.STRING(128), field: 'country' })
	country!: string;

	@Column({ type: DataType.STRING(11), field: 'mobile_number' })
	mobileNumber!: string;

	@Column({ type: DataType.STRING(11), field: 'phone_number' })
	phoneNumber!: string;

	@Column({ type: DataType.STRING(128), field: 'schooling' })
	schooling!: string;

	@Column({ type: DataType.STRING(128), field: 'school_name' })
	schoolName!: string;

	@Column({ type: DataType.STRING(32), field: 'enrollment_date' })
	enrollmentDate!: string;

	@Column({ type: DataType.STRING(32), field: 'updated_date' })
	updatedDate?: string;

	@Column({ type: DataType.STRING(32), field: 'candidate_status' })
	candidateStatus!: string;
}

export default CandidateDTO;
