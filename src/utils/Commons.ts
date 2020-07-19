import moment from 'moment-timezone';

import Constants from './constants';

class Commons {
    constructor() { };

    getLocaleDate = () => moment.tz(Constants.DATE_TIME.TIMEZONE)
        .format(Constants.DATE_TIME.FORMAT);
    
    getFormatedDate  = (date: string) => moment(date).format(Constants.DATE_TIME.FORMAT);
}

export default Commons