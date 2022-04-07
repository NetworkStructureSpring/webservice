import * as upload from '../services/Profile.js'
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
export const addProfilePic = async (request, response) => {
    try {
        sdc.increment('POST/v1/user/self/pic');
        console.log("Post Profile Pic Endpoint");
        var returnValue = await upload.authenticateUser(request, response);
        if (returnValue.statusCode == 401) {
            response.status(401);
            response.json(returnValue.message)
            return response;
        }
        await upload.setFileName(request,response,returnValue.foundUser[0].dataValues.id)
        const singleUpload = upload.upload.single("productimage");
         singleUpload(request, response, async function (err) {
            if (err) {
                return response.status(422).send({ errors: [{ title: 'File Upload Error', detail: err.message }] });
             }
             const result =await upload.saveToDatabase(request, response, returnValue)
             setResponse(result.statusCode, response, result.message);   // change this
         });
    }
    catch (e) {
        errorHandler(e.message, response);
    }
}

export const getProfilePic = async (request, response) => {
    try {
        sdc.increment('GET/v1/user/self/pic');
        console.log("Get Profile Pic Endpoint");
        var returnValue = await upload.authenticateUser(request, response);
        if (returnValue.statusCode == 401) {
            response.status(401);
            response.json(returnValue.message)
            return response;
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
        sdc.increment('DELETE/v1/user/self/pic');
        console.log("Delete Profile Pic Endpoint");
        var returnValue = await upload.authenticateUser(request, response);
        if (returnValue.statusCode == 401) {
            response.status(401);
            response.json(returnValue.message)
            return response;
        }
        const result = await upload.deleteProfilePic(request, response, returnValue);
        setResponse(result.statusCode, response, result.message);
    }
    catch (e) {
        errorHandler(e.message, response);
    }
}