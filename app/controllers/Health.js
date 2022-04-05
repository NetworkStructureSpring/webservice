import * as healthService from '../services/Health.js';
import * as CloudWatchBuddy from 'cloudwatch-buddy';


var awsOptions = {
	region: 'us-east-1'			// Required. You must enter a valid AWS region
};

var logsOptions = {
	logGroup: 'amazon-cloudwatch-agent.log',
	timeout: 60,
	maxSize: 10000,
	addInstanceId: true,
	addTimestamp: true,
	logFormat: 'string',
	debug: true,
};
var cwbLogs = new CloudWatchBuddy(awsOptions).logs(logsOptions);
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
        cwbLogs.log('Sonali', 'Test message');
        const result = await healthService.getServiceHealth(); 
        setSuccessResponse(result, response);
    }
    catch (e) {
        errorHandler(e.message, response);
    }
}
