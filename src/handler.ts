import serverless from 'serverless-http';

import app from './app';

exports.run = serverless(app);
