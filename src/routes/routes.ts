import express from 'express';
import {
	getCandidateByUniqueId,
	getCandidateByCPf,
	postCandidates,
	deleteByUniqueId,
	putCandidates,
} from '../controllers/CandidateController';
import { getHealth } from '../controllers/InternalController';

const Routes: express.Router = express.Router();

Routes.get('/health', getHealth);
Routes.get('/candidate/:uniqueId', getCandidateByUniqueId);
Routes.get('/candidate/:documentNumber', getCandidateByCPf);
Routes.post('/candidate', postCandidates);
Routes.get('/candidates', postCandidates);
Routes.delete('/candidate/:uniqueId', deleteByUniqueId);
Routes.put('/candidate', putCandidates);

export default Routes;
