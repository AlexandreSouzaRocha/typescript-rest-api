const Constants = {
	DATABASE: {
		DEFAULT_CONDITION: '*',
	},
	EVENT: {
		HEALTH_CHECK: 'HealthCheckEvent',
	},
	CANDIDATE: {
		STATUS: {
			APPROVED: 'APPROVED',
			DELETED: 'DELETED',
			DISAPPROVED: 'DISAPPROVED',
		},
	},
	REGEX: {
		NAME: /[A-Z][a-zA-Z][^#&<>\\"~;$^%{}?]{1,128}$/,
		PHONE: /^[0-9]{8,11}$/,
		ZIP_CODE: /^[0-9]{8,8}$/,
		UUID: /^[0-9a-f]{8}-[0-9a-f]{4}-[0-5][0-9a-f]{3}-[089ab][0-9a-f]{3}-[0-9a-f]{12}$/i,
		CPF: /^[0-9]{11,11}/,
		RG: /^[0-9]{9,9}/,
		NUMBER: /^[0-9]{1,14}/,
	},
	HTTPSTATUS: {
		OK: 200,
		CREATED: 201,
		BAD_REQUEST: 400,
		UNAUTHORIZED: 401,
		FORBIDDEN: 403,
		NOT_FOUND: 404,
		CONFLICT: 409,
		INTERNAL_SERVER_ERROR: 500,
		GATEWAY_TIME_OUT: 504,
	},
	SCHOOLING_STATUS: ['COMPLETED, STUDYING'],
	MESSAGE: {
		INVALID: {
			NAME: 'The field {} is null or invalid. It only accepts a {} with MAX length of 128 characters.',
			DATE: 'The field {} is null or invalid. It only accepts a date on format YYYY-MM-DD.',
			RG: 'The field rg is null or invalid. It only accepts a valid RG with MAX length of 9 characters.',
			CPF: 'The field cpf is null or invalid. It only accepts a valid CPF with MAX length of 11 characters.',
			ADDRESS: 'The field address is null or invalid. It only accepts a valid address with MAX len of 128 characters.',
			ZIP_CODE:
				'The field zipCode is null or invalid. It only accepts a valid zipCode with MAX length of 8 characters.',
			COUNTRY: 'The field country is null or invalid. It only accepts a existing country.',
			PHONE: 'The field {} is null or invalid. It only accepts a valid {} with MAx len of 11 characters.',
			SCHOOLING: 'The field schooling is null or invalid. It only accepts COMPLETED or STUDYING',
			UNIQUE_ID: 'The uniqueId {} is null or invalid. It only accepts a valid uniqueId.',
			FILTER:
				'The filter {} is invalid for query. It only accepts [cpf, rg, uniqueId, enrollmentDate, scholling, candidateStatus, candidateName, page, limit]',
			ENROLLMENT_DATE: `The filter enrollmentDate is null or invalid. It only accepts a date on format YYYY-MM-DDThh:mm:ss`,
			CANDIDATE_STATUS: 'The candidateStatus {} is null or invalid. It only accepts [APPROVED, DISAPPROVED or DELETED]',
			PAGEABLE_PARAM:
				'The param {} is null or invalid. It only accepts positives numbers greather than 0 with MAX len of 14 characters',
		},
		DEFUALT: {
			BAD_REQUEST: 'The attributes of the request is null or invalid.',
			DATABASE_ERROR: 'Internal error while executing query on database.',
			SERVER_ERROR: 'Internal server error while executing request.',
		},
		CANDIDATE_EXISTS: 'The candidate {} alredy exists.',
		CANDIDATE_NOT_FOUND: 'The candidate {} was not found.',
		CANDIDATE_DELETED: 'The candidate {} has been deleted sucessfully.',
		CANDIDATE_UPDATED: 'The candidate has been updated sucessfully.',
		CANDIDATE_ALREADY_DELETED: 'The candidate {} has been already deleted.',
	},
	EXCEPTION: {
		CANDIDATE: 'GCMCandidateException',
		DATABASE: 'DataBaseException',
		VALIDATION: 'ValidationException',
		CANDIDATE_EXISTS: 'CandidateExistsException',
		SERVER_ERROR: 'InternalServerErrorException',
	},
	JOI: {
		CONFIG: {
			abortEarly: false,
			stripUnknown: {
				objects: true,
				arrays: false,
			},
		},
	},
	DATE_TIME: {
		TIMEZONE: 'America/Sao_Paulo',
		FORMAT: 'YYYY-MM-DDThh:mm:ss',
	},
	ALLOWED_FILTERS: [
		'cpf',
		'rg',
		'uniqueId',
		'enrollmentDate',
		'scholling',
		'candidateStatus',
		'candidateName',
		'page',
		'limit',
	],
};

export default Constants;
