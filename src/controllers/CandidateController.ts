import { Request, Response } from 'express';

import CandidateService from '../services/CandidateService';
import ErrorHandler from '../errors/ErrorHandler';
import { logger } from '../utils/logger';
import Constants from '../utils/constants';
import Candidate from '../interfaces/Candidate';
import { CandidateDTO } from '../models/Candidate';

const candidateService: CandidateService = new CandidateService();
const errHandler: ErrorHandler = new ErrorHandler();

export const postCandidates = async (request: Request, response: Response): Promise<object> => {
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
      .status(err.code || Constants.HTTPSTATUS.BAD_REQUEST)
      .json(errHandler.errorResponse(err || err.message));
  }
};

export const getCandidateByUniqueId = async (request: Request, response: Response): Promise<object> => {
  try {
    const { uniqueId } = request.params;

    const candidate: CandidateDTO = await candidateService.findCandidateByUniqueId(uniqueId);

		return response.status(Constants.HTTPSTATUS.OK).json(candidate);
  } catch (err) {
    logger.error({
      event: 'CandidateController.getCandidateByUniqueId',
      error: err.message,
			statusCode: err.code || Constants.HTTPSTATUS.BAD_REQUEST,
    });

    return response
      .status(err.code || Constants.HTTPSTATUS.BAD_REQUEST)
      .json(errHandler.errorResponse(err || err.message));
  }
};
