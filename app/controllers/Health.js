import * as healthService from '../services/Health.js';
import lawgs from 'index';

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
        lawgs.config({
            aws: {
                region: 'us-east-1' /* Required */
            }
        });
        var logger  = lawgs.getOrCreate('amazon-cloudwatch-agent.log'); /* LogGroup */
        logger.log('touchdown', { team: 'Patriots', weight: 7 });
        const result = await healthService.getServiceHealth(); 
        setSuccessResponse(result, response);
    }
    catch (e) {
        errorHandler(e.message, response);
    }
}
