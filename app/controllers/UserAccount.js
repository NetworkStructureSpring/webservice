import * as healthService from '../services/Health.js';
import SDC from 'statsd-client';
let sdc = new SDC({
  host: 'localhost',
  prefix: 'csye6225-webapp'
});
const setResponse = (statusCode, response, message) => {
    response.status(statusCode);
    response.json(message);
}
const errorHandler = (data, response) => {
    response.status(500);
    response.json(data);
}
export const createUser = async (request, response) => {
    try {
        sdc.increment('POST/v1/user');
        console.log("Add User Endpoint");
        const item = await healthService.createNewUser(request,response); 
        setResponse(item.statusCode, response, item.message);
    }
    catch (e) {
        errorHandler(e.message, response);
    }
}
export const updateUser = async (request, response) => {
    try {
        sdc.increment('PUT/v1/user');
        console.log("Update User Endpoint");
        const item = await healthService.updateUser(request,response); 
        setResponse(item.statusCode, response, item.message);
    }
    catch (e) {
        errorHandler(e.message, response);
    }
}
export const getParticularUser = async (request, response) => {
    try {
        sdc.increment('GET/v1/user');
        console.log("Get Particular User Endpoint");
        const item = await healthService.getParticularUser(request,response); 
        setResponse(item.statusCode, response, item.message);
    }
    catch (e) {
        errorHandler(e.message, response);
    }
}