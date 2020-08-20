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

	static getPassword() {
		return new Promise((resolve) => {
			setTimeout(() => {
				logger.info({ event: 'Commons.getPaassword', DB_PASSWORD });

				resolve(DB_PASSWORD);
			}, 1);
		});
	}
}

export default Commons;
