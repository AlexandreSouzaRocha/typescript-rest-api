import Candidate from '../interfaces/Candidate';
import Model from './Base.model';

const SCHEMA = 'typescript_api';
const TABLE = 'candidate';

class CandidateModel extends Model {
	constructor() {
		super(SCHEMA, TABLE);
	}

	async findByFilterableParams(where: any, pageableParams: any, whereBwtween?: any): Promise<any[]> {
		const { limit, offSet } = pageableParams;
		if (typeof whereBwtween !== 'undefined') {
			const result: any[] = await super
				.connection(TABLE)
				.withSchema(SCHEMA)
				.where(where)
				.whereBetween(whereBwtween.field, [whereBwtween.from, whereBwtween.to])
				.limit(limit)
				.offset(offSet);
			return result;
		}
		const result: any[] = await super.connection(TABLE).withSchema(SCHEMA).where(where).limit(limit).offset(offSet);
		return result;
	}

	getResponse(row: any): Candidate {
		const result: Candidate = {
			id: row.id,
			address: row.address,
			birthDate: row.birth_date,
			country: row.country,
			cpf: row.cpf,
			fatherName: row.father_name,
			mobileNumber: row.mobile_number,
			motherName: row.mother_name,
			name: row.row_name,
			neighborhood: row.neighborhood,
			phoneNumber: row.phone_number,
			rg: row.rg,
			schoolName: row.school_name,
			schooling: row.schooling,
			zipCode: row.zip_code,
			enrollmentDate: row.enrollment_date,
			candidateStatus: row.candidate_status,
		};

		return result;
	}

	getResponseList(rows: any[]): Candidate[] {
		const result: Candidate[] = [];

		rows.forEach((row) => result.push(this.getResponse(row)));

		return result;
	}
}

export default CandidateModel;
