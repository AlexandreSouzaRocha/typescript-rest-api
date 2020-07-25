import moment from 'moment-timezone';
import Constants from './constants';

class Commons {
	constructor() {}

	static getLocaleDate(): string {
		return moment().tz(Constants.DATE_TIME.TIMEZONE).format(Constants.DATE_TIME.FORMAT);
	}

	static getFormatedDate(date: string): string {
		return moment(date).format(Constants.DATE_TIME.FORMAT);
	}
}

export default Commons;
