import * as healthService from '../services/Health.js';
import SDC from 'statsd-client';
let sdc = new SDC({
  host: 'localhost',
  prefix: 'csye6225-webapp'
});

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
        sdc.increment('GET/healthz');
        console.log("Health Endpoint");
        const result = await healthService.getServiceHealth(); 
        setSuccessResponse(result, response);
    }
    catch (e) {
        errorHandler(e.message, response);
    }
}
