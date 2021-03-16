import { PoolClient } from 'pg';
import ErrorFactory from '../errors/ErrorFactory';
import logger from '../utils/logger';
import Candidate from '../interfaces/Candidate';
import Model from './Base.model';
import Constants from '../utils/constants';

class CandidateModel extends Model {
	errorFactory: ErrorFactory;

	constructor({ schema, table, connection }: { schema: string; table: string; connection: PoolClient }) {
		super({ schema, table, connection });
		this.errorFactory = new ErrorFactory();
	}

	async findByFilterableParams(where: any, pageableParams: any, whereBetween?: any): Promise<any> {
		const { limit, offSet } = pageableParams;
		const { from, to } = whereBetween;
		const result: any = {};
		result.rows = [];
		result.count = 0;
		try {
			logger.info({ event: 'CandidateModel.findByFilterableParams', where, pageableParams, whereBetween });

			const keys = Object.keys(where);
			const values = Object.values(where);

			if (typeof whereBetween !== 'undefined' && whereBetween !== null) {
				keys.concat(Object.keys(whereBetween));
				values.concat(Object.values(whereBetween));
			}

			const betweenCondition = from && to ? `BETWEEN $${keys.length + 1}::date AND ${keys.length + 2}::date` : '';
			const whereCondition = `${keys.map((value, index) => `${value} = $${index + 1}`).join(',')}`;
			const pagination = ` LIMIT ${limit} OFFSET ${offSet}`;
			let query = `SELECT ${this.condition} FROM ${this.table}${this.schema} WHERE ${whereCondition}`;
			const countQuery = `SELECT COUNT(*) FROM ${this.table}${this.schema} WHERE ${whereCondition}`;

			if (betweenCondition !== '') {
				query = query.concat(` ${betweenCondition}${pagination}`);
				values.concat([from, to]);
			} else {
				query = query.concat(pagination);
			}

			const [resolvedRows, resolvedCount] = await Promise.allSettled([
				this.connection.query(query, values),
				this.connection.query(countQuery, values),
			]);

			if (resolvedRows.status === 'rejected') {
				logger.error({
					event: 'CandidateModel.findByFilterableParams',
					error: resolvedRows.reason,
				});
				this.errorFactory.throwError({
					message: Constants.MESSAGE.DEFUALT.DATABASE_ERROR,
					requestId: global.requestId,
					exceptionType: Constants.EXCEPTION.DATABASE,
					statusCode: Constants.HTTPSTATUS.INTERNAL_SERVER_ERROR,
				});
			} else if (resolvedCount.status === 'rejected') {
				logger.error({
					event: 'CandidateModel.findByFilterableParams',
					error: resolvedCount.reason,
				});
				this.errorFactory.throwError({
					message: Constants.MESSAGE.DEFUALT.DATABASE_ERROR,
					requestId: global.requestId,
					exceptionType: Constants.EXCEPTION.DATABASE,
					statusCode: Constants.HTTPSTATUS.INTERNAL_SERVER_ERROR,
				});
			} else {
				logger.info({
					event: 'CandidateModel.findByFilterableParams',
					totalRows: result.rows.length,
					count: result.count,
				});

				result.rows.concat(CandidateModel.getResponseList(resolvedRows.value.rows));
				result.count = Number(resolvedCount.value);

				return result;
			}
		} catch (error) {
			logger.error({ event: 'CandidateModel.findByFilterableParams', error: error.message });
			this.errorFactory.throwError({
				message: Constants.MESSAGE.DEFUALT.DATABASE_ERROR,
				requestId: global.requestId,
				exceptionType: Constants.EXCEPTION.DATABASE,
				statusCode: Constants.HTTPSTATUS.INTERNAL_SERVER_ERROR,
			});
		}

		return result;
	}

	static getResponse(row: any): Candidate {
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

	static getResponseList(rows: any[]): Candidate[] {
		const result: Candidate[] = [];

		rows.forEach((row) => result.push(this.getResponse(row)));

		return result;
	}
}

export default CandidateModel;
