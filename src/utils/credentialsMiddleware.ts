import * as cls from 'cls-hooked';

import logger from './logger';
import Commons from './Commons';
import Constants from './constants';
import uuidV4 from './globals';

const nsId = `gcm:${uuidV4}`;
const ns = cls.createNamespace(nsId);

export const expressMiddleware = () => {
	return async (req: any, res: any, next: any) => {
		let password;

		try {
			password = await Commons.getPassword();

			logger.info({ event: 'credentialsMiddleware.password' });
		} catch (err) {
			logger.error({ event: 'extractCredentials()', err: err.message, uuid: uuidV4 });

			return res
				.status(Constants.HTTPSTATUS.UNAUTHORIZED)
				.send({ message: Constants.MESSAGE.DEFUALT.BAD_REQUEST, uuid: uuidV4 });
		}

		ns.run(() => {
			cls.getNamespace(nsId)?.set('password', String(password));
			next();
		});
	};
};

export const dbpassword = () => ns.get('password');
