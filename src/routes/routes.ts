import express from 'express';
import { getCandidateByUniqueId, getCandidateByCPf, postCandidates } from '../controllers/CandidateController';
import { getHealth } from '../controllers/InternalController';

const Routes: express.Router = express.Router();

Routes.get('/health', getHealth);
Routes.get('/candidate/:uniqueId', getCandidateByUniqueId);
Routes.get('/candidate/:documentNumber', getCandidateByCPf);
Routes.post('/candidate', postCandidates);

export default Routes;
