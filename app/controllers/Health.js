import * as healthService from '../services/Health.js';
import CloudWatchBuddy from 'cloudwatch-buddy';
import { awsOptions, logsOptions,metricsOptions } from '../Config.js';

var cwbLogs = new CloudWatchBuddy(awsOptions).logs(logsOptions);
var cwbMetrics = new CloudWatchBuddy(awsOptions).metrics(metricsOptions);

//This method handles success status code
const setSuccessResponse = (data, response) => {
    response.sendStatus(data);
}
//This method handles error status code
const errorHandler = (data, response) => {
    response.sendStatus(400);
}
export const getServiceHealth = async (request, response) => {
    try {
        // cwbLogs.log('Sonali', 'Test message');
		cwbMetrics.increment('pageviews');
        const result = await healthService.getServiceHealth(); 
        setSuccessResponse(result, response);
    }
    catch (e) {
        errorHandler(e.message, response);
    }
}
