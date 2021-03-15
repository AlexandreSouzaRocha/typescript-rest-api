import { PoolClient } from 'pg';
import Constants from '../utils/constants';

class Model {
	schema: string;

	table: string;

	connection: PoolClient;

	condition: string;

	constructor({ schema, table, connection }: { schema: string; table: string; connection: PoolClient }) {
		this.schema = schema;
		this.table = table;
		this.connection = connection;
		this.condition = Constants.DATABASE.DEFAULT_CONDITION;
	}

	async findAll(where: any): Promise<any[]> {
		const values = Object.values(where);
		const keys = Object.keys(where);
		const whereCondition = `${keys.map((value, index) => `${value} = $${index + 1}`).join(',')}`;
		const query = ` SELECT ${this.condition} FROM ${this.schema}.${this.table} WHERE ${whereCondition}`;

		const { rows } = await this.connection.query(query, values);

		return rows;
	}

	async findOne(where: any, select?: any): Promise<any> {
		const values = Object.values(where);
		const keys = Object.keys(where);
		const whereCondition = `${keys.map((value, index) => `${value} = $${index + 1}`).join(',')}`;
		this.condition = select && select;
		const query = `${this.condition} FROM ${this.table}${this.schema} WHERE ${whereCondition} LIMIT 1`;

		const { rows } = await this.connection.query(query, values);
		const [row] = rows;

		return row;
	}

	async findBy(where: any, select?: any): Promise<any> {
		this.condition = select && select;
		const values = Object.values(where);
		const keys = Object.keys(where);
		const whereCondition = `${keys.map((key, index) => `${key} = $${index + 1}`).join(',')}`;
		const query = `SELECT ${this.condition} FROM ${this.schema}${this.table} WHERE ${whereCondition} ORDER BY DESC`;

		const { rows } = await this.connection.query(query, values);

		return rows;
	}

	async updateBy(where: any, fields: any): Promise<any[]> {
		const updateKeys = Object.keys(fields);
		const updateValues = Object.values(where);
		const whereCondition = Object.keys(where)
			.map((key) => `${key} = ${where[key]}`)
			.join(',');
		const updateCondition = `${updateKeys.map((key, index) => `${key} = $${index + 1}`).join(',')}`;
		const query = `UPDATE ${this.schema}${this.table} SET ${updateCondition} WHERE ${whereCondition} RETURNING ${this.condition}`;

		const { rows } = await this.connection.query(query, updateValues);

		return rows;
	}

	async insertInto(fields: any): Promise<any> {
		const values = Object.keys(fields);
		const keys = Object.values(fields);
		const insertIntoCondition = `${keys.map((key) => `${key}`).join(',')}`;
		const insertValuesCondition = `${values.map((key, index) => `$${index + 1}`).join(',')}`;
		const query = `INSER INTO ${this.schema}${this.table} (${insertIntoCondition}) VALUES(${insertValuesCondition})`;

		const { rows } = await this.connection.query(query, values);
		const [row] = rows;

		return row;
	}

	async deleteBy(where: any): Promise<any> {
		const values = Object.keys(where);
		const keys = Object.values(where);
		const whereCondition = `${keys.map((key, index) => `${key} = $${index + 1}`).join(',')}`;
		const query = `DELETE FROM ${this.schema}${this.table} WHERE (${whereCondition}) RETURNING ${this.condition}`;

		const { rows } = await this.connection.query(query, values);
		const [row] = rows;

		return row;
	}
}

export default Model;
