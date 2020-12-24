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
			}, 200);
		});
	}

	static getTime = (date: string) => moment(date, 'YYYY-MM-DDTHH:mm:ss.SSS').format('HH:mm:ss');

	static verifyLastPayment = () => {
		logger.info({ event: 'utils.verifyLastPayment' });

		const date: string = Commons.getLocaleDate();
		const paymentCurrentTime: string = Commons.getTime(date);
		const paymentAfterWindowTimeStart: any = moment('20:30:00', 'HH:mm:ss');
		const paymentAfterWindowTimeEnd: any = moment('07:59:59', 'HH:mm:ss');
		const scheduleHours = [0, 1, 2, 3, 4, 5, 6, 7, 21, 22, 23];
		const afterPaymentWindow =
			moment(paymentCurrentTime, 'HH:mm:ss').isAfter(paymentAfterWindowTimeStart) ||
			moment(paymentCurrentTime, 'HH:mm:ss').isBefore(paymentAfterWindowTimeEnd);

		if (scheduleHours.includes(moment(paymentCurrentTime, 'HH').hours())) {
			logger.info({
				event: 'utils.verifyLastPayment.scheduleHours',
				afterPaymentWindow: true,
				currentTime: moment(paymentCurrentTime, 'HH:mm:ss').format('HH:mm:ss'),
			});
			return true;
		}
		if (afterPaymentWindow) {
			logger.info({
				event: 'utils.verifyLastPayment.afterPaymentWindows',
				afterPaymentWindow: true,
				currentTime: moment(paymentCurrentTime, 'HH:mm:ss').format('HH:mm:ss'),
			});
			return true;
		}

		return false;
	};
}

export default Commons;
