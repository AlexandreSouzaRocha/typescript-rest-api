import * as cls from 'cls-hooked';
import * as uuid from 'uuid';

const nsId = uuid.v4();
const ns = cls.createNamespace(nsId);

export const expressMiddleware = () => {
	return (req: any, res: any, next: any) => {
		ns.bindEmitter(req);
		ns.bindEmitter(res);
		const requestId = req.headers['x-request-id'] ? req.headers['x-request-id'] : nsId;

		ns.run(() => {
			cls.getNamespace(nsId)?.set('requestId', requestId);
			next();
		});
	};
};

export const requestId = () => ns.get('requestId');
