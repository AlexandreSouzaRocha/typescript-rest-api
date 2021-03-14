import { PoolClient } from 'pg';

class Model {
	schema: string;

	table: string;

	connection: PoolClient;

	constructor(schema: string, table: string, connection: PoolClient) {
		this.schema = schema;
		this.table = table;
		this.connection = connection;
	}

	async findAll(where: any): Promise<any[]> {
		const values = Object.values(where);
		const keys = Object.keys(where);
		const whereCondition = `${keys.map((value, index) => `${value} = $${index + 1}`).join(',')}`;
		const query = ` SELECT * FROM ${this.schema}.${this.table} WHERE ${whereCondition}`;

		const { rows } = await this.connection.query(query, values);

		return rows;
	}

	async findOne(where: any, select: any): Promise<any> {
		const values = Object.values(where);
		const keys = Object.keys(where);
		const whereCondition = `${keys.map((value, index) => `${value} = $${index + 1}`).join(',')}`;
		const selectCondition = select ? Object.keys(select).join(',') : '*';
		const query = `${selectCondition} ${whereCondition} LIMIT 1`;

		const { rows } = await this.connection.query(query, values);

		return rows[0];
	}

	async findBy(where: any, select: any): Promise<any[]> {
		return this.connection(this.table)
			.withSchema(this.schema)
			.select(select || '*')
			.where(where);
	}

	async updateBy(where: any, fields: any): Promise<any> {
		return this.connection(this.table).withSchema(this.schema).update(fields).where(where).returning('*');
	}

	async deleteAll(): Promise<any> {
		return this.connection(this.table).withSchema(this.schema).delete().returning('*');
	}

	async deleteBy(where: any): Promise<any> {
		return this.connection(this.table).withSchema(this.schema).delete().where(where).returning('*');
	}

	async insertInto(fields: any): Promise<any[]> {
		return this.connection(this.table).withSchema(this.schema).insert(fields, '*');
	}
}

export default Model;
