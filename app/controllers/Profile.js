import * as upload from '../services/Profile.js'

const setResponse = (statusCode, response, message) => {
    response.status(statusCode);
    response.json(message);
}
const errorHandler = (data, response) => {
    response.status(500);
    response.json(data);
}
export const addProfilePic = async (request, response) => {
    try {
        
        var returnValue = await upload.authenticateUser(request, response);
        if (returnValue.statusCode == 401) {
            setResponse(returnValue.statusCode, response, returnValue.message);
        }
        await upload.setFileName(request,response,returnValue.foundUser[0].dataValues.id)
        const singleUpload = upload.upload.single('productimage');
         singleUpload(request, response, function (err) {
            if (err) {
                return response.status(422).send({ errors: [{ title: 'File Upload Error', detail: err.message }] });
             }
             const result = upload.saveToDatabase(request, response, returnValue)
             response.status(200);
             response.json(result);
             return response;
            // setResponse(result.statusCode, response, result.message);   // change this
         });
    }
    catch (e) {
        errorHandler(e.message, response);
    }
}

export const getProfilePic = async (request, response) => {
    try {
        var returnValue = await upload.authenticateUser(request, response);
        if (returnValue.statusCode == 401) {
            setResponse(returnValue.statusCode, response, returnValue.message);
        }
        const result = await upload.getProfilePic(request, response, returnValue);
        setResponse(result.statusCode, response, result.message);
    }
    catch (e) {
        errorHandler(e.message, response);
    }
}

export const deleteProfilePic = async (request, response) => {
    try {
        var returnValue = await upload.authenticateUser(request, response);
        if (returnValue.statusCode == 401) {
            setResponse(returnValue.statusCode, response, returnValue.message);
        }
        const result = await upload.deleteProfilePic(request, response, returnValue);
        setResponse(result.statusCode, response, result.message);
    }
    catch (e) {
        errorHandler(e.message, response);
    }
}