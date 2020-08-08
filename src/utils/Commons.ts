import moment from 'moment-timezone';
import Constants from './constants';
import { DB_PASSWORD } from '../config';
import logger from './logger';

class Commons {
	constructor() {}

	static getLocaleDate(): string {
		return moment().tz(Constants.DATE_TIME.TIMEZONE).format(Constants.DATE_TIME.FORMAT);
	}

	static getFormatedDate(date: string): string {
		return moment(date).format(Constants.DATE_TIME.FORMAT);
	}

	static async getPassword() {
		logger.info({ event: 'Commons.getPaassword' });

		return new Promise((resolve) => {
			setTimeout(async () => {
				logger.info({ event: 'Commons.getPaassword', DB_PASSWORD });

				await resolve(DB_PASSWORD);
			}, 1000);
		});
	}
}

export default Commons;
