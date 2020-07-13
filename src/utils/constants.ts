const Constants = {
    HTTPSTATUS: {
        BAD_REQUEST: 400,
    },
    MESSAGE: {
        INVALID: {

        },
        DEFUALT: {
            BAD_REQUEST: 'The attributes of the request is null or invalid.'
        }
    },
    EXCEPTION: {
        CANDIDATE: 'GCMCandidateException'
    },
    JOI: {
        CONFIG: {
            abortEarly: false,
            stripUnknown: {
                objects: true,
                arrays: false
            }
        }
    }
}

export default Constants;