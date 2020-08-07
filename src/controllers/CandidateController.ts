import { Request, Response } from 'express';

import CandidateService from '../services/CandidateService';
import logger from '../utils/logger';
import Constants from '../utils/constants';
import Candidate from '../interfaces/Candidate';
import CandidateDTO from '../models/Candidate';
import ErrorFactory from '../errors/ErrorFactory';
import Commons from '../utils/Commons';

const candidateService: CandidateService = new CandidateService();
const errorFactory: ErrorFactory = new ErrorFactory();
const commons: Commons = new Commons();

export const postCandidates = async (request: Request, response: Response): Promise<Response> => {
	try {
		logger.info({ event: 'CandidateController.postCandidate' });

		const { body } = request;
		const candidate: Candidate = await candidateService.execCandidateTransactions(body);

		return response.status(Constants.HTTPSTATUS.CREATED).json(candidate);
	} catch (err) {
		logger.error({
			event: 'CandidateController.postCandidate',
			error: err.message,
			statusCode: err.code || Constants.HTTPSTATUS.BAD_REQUEST,
		});

		return response
			.status(err.statusCode || Constants.HTTPSTATUS.BAD_REQUEST)
			.json(errorFactory.getResponse(err || err.message));
	}
};

export const getCandidateByUniqueId = async (request: Request, response: Response): Promise<Response> => {
	try {
		const { uniqueId } = request.params;

		const candidate: CandidateDTO | null | undefined = await candidateService.findCandidateByUniqueId(uniqueId);

		return response.status(Constants.HTTPSTATUS.OK).json(candidate);
	} catch (err) {
		logger.error({
			event: 'CandidateController.getCandidateByUniqueId',
			error: err.message,
			statusCode: err.code || Constants.HTTPSTATUS.BAD_REQUEST,
		});

		return response
			.status(err.code || Constants.HTTPSTATUS.BAD_REQUEST)
			.json(errorFactory.getResponse(err || err.message));
	}
};

export const getCandidateByCPf = async (request: Request, response: Response): Promise<Response> => {
	try {
		const { documentNumber }: any = request.headers;

		const candidate: CandidateDTO | null | undefined = await candidateService.findCandidateByCpf(documentNumber);

		return response.status(Constants.HTTPSTATUS.OK).json(candidate);
	} catch (err) {
		logger.error({
			event: 'CandidateController.getCandidateByUniqueId',
			error: err.message,
			statusCode: err.code || Constants.HTTPSTATUS.BAD_REQUEST,
		});

		return response
			.status(err.code || Constants.HTTPSTATUS.BAD_REQUEST)
			.json(errorFactory.getResponse(err || err.message));
	}
};

export const deleteByUniqueId = async (request: Request, response: Response): Promise<Response> => {
	try {
		const { uniqueId } = request.params;

		const candidateDeleted: string | undefined = await candidateService.deleteByUniqueId(uniqueId);

		return response.status(Constants.HTTPSTATUS.OK).json({
			message: Constants.MESSAGE.CANDIDATE_DELETED.replace('{}', `${candidateDeleted}`),
			deletedAt: Commons.getLocaleDate(),
		});
	} catch (err) {
		logger.error({
			event: 'CandidateController.deleteByUniqueId',
			error: err.message,
			statusCode: err.code || Constants.HTTPSTATUS.BAD_REQUEST,
		});

		return response
			.status(err.code || Constants.HTTPSTATUS.BAD_REQUEST)
			.json(errorFactory.getResponse(err || err.message));
	}
};
