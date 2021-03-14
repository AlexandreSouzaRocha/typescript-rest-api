import { DateTime } from 'luxon';
import Constants from './constants';
import { DB_PASSWORD } from '../config';
import logger from './logger';

class Commons {
	static getLocaleDate(): string {
		return DateTime.now().setZone(Constants.DATE_TIME.TIMEZONE).toFormat(Constants.DATE_TIME.FORMAT);
	}

	static getFormatedDate(date: string): string {
		return DateTime.fromISO(date).toFormat(Constants.DATE_TIME.FORMAT);
	}

	static getPassword(): Promise<string> {
		return new Promise((resolve) => {
			setTimeout(() => {
				logger.info({ event: 'Commons.getPaassword', DB_PASSWORD });

				resolve(DB_PASSWORD);
			}, 200);
		});
	}
}

export default Commons;
