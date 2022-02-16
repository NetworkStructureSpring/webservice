import * as healthService from '../services/Health.js';
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
        const item = await healthService.createNewUser(request,response); 
        setResponse(item.statusCode, response, item.message);
    }
    catch (e) {
        errorHandler(e.message, response);
    }
}
export const updateUser = async (request, response) => {
    try {
        const item = await healthService.updateUser(request,response); 
        setResponse(item.statusCode, response, item.message);
    }
    catch (e) {
        errorHandler(e.message, response);
    }
}
export const getParticularUser = async (request, response) => {
    try {
        const item = await healthService.getParticularUser(request,response); 
        setResponse(item.statusCode, response, item.message);
    }
    catch (e) {
        errorHandler(e.message, response);
    }
}