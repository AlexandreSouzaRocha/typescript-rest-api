import { Request, Response } from 'express';

import CandidateService from '../services/CandidateService';
import logger from '../utils/logger';
import Constants from '../utils/constants';
import Candidate from '../interfaces/Candidate';
import CandidateDTO from '../models/CandidateDTO';
import ErrorFactory from '../errors/ErrorFactory';
import Commons from '../utils/Commons';
import CandidateFilters from '../interfaces/CandidateFilters';
import Validations from '../validators/Validations';

const candidateService: CandidateService = new CandidateService();
const errorFactory: ErrorFactory = new ErrorFactory();
const validators: Validations = new Validations();

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
			statusCode: err.statusCode || Constants.HTTPSTATUS.BAD_REQUEST,
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

export const putCandidates = async (request: Request, response: Response): Promise<Response> => {
	try {
		logger.info({ event: 'CandidateController.putCandidates' });

		const { body } = request;
		const candidate: CandidateDTO | undefined = await candidateService.updateCandidate(body);

		return response.status(Constants.HTTPSTATUS.OK).json({ message: Constants.MESSAGE.CANDIDATE_UPDATED, candidate });
	} catch (err) {
		logger.error({
			event: 'CandidateController.putCandidates',
			error: err.message,
			statusCode: err.code || Constants.HTTPSTATUS.BAD_REQUEST,
		});

		return response
			.status(err.statusCode || Constants.HTTPSTATUS.BAD_REQUEST)
			.json(errorFactory.getResponse(err || err.message));
	}
};

export const getCandidatesByFilters = async (request: Request, response: Response): Promise<Response> => {
	try {
		logger.info({ event: 'CandidateController.getCandidatesByFilters', params: request.query });
		const { query } = request;
		const candidateFilters: CandidateFilters = await validators.validateFilterableParamsJoi(query);
		const items = await candidateService.findAllCandidatesByFilters(candidateFilters, query);

		if (typeof items === 'object') return response.status(Constants.HTTPSTATUS.OK).json(items);

		return response.status(Constants.HTTPSTATUS.OK).json({});
	} catch (err) {
		logger.error({
			event: 'CandidateController.getCandidatesByFilters',
			erro: err.message,
			statusCode: err.code || Constants.HTTPSTATUS.BAD_REQUEST,
		});

		return response.status(500).send({ error: err.stack });
	}
};
