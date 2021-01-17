import Knex from 'knex';

import KnexConnection from '../database/connection/KnexConnection';

class Model {
	schema: string;

	table: string;

	connection: Knex;

	constructor(schema: string, table: string) {
		this.schema = schema;
		this.table = table;
		this.connection = KnexConnection;
	}

	async findAll(select: any): Promise<any[]> {
		return this.connection(this.table)
			.withSchema(this.schema)
			.select(select || '*');
	}

	async findOne(where: any, select: any): Promise<any> {
		return this.connection(this.table)
			.withSchema(this.schema)
			.select(select || '*')
			.first();
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
