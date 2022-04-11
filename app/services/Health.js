import axios from "axios";
import User from "../Models/UserAccount.js";
import bcrypt from "bcrypt"; 
import emailValidator from "email-validator";
import AWS from "aws-sdk";
import short from "shortid";

export const getServiceHealth = async () => {
    try {
        const response = await axios.get('https://virtserver.swaggerhub.com/spring2022-csye6225/app/1.0.0/healthz')
        return response.status;
    }
    catch (error) {
        throw error;
      }
}
export const createNewUser = async (req,res) => {
    try {
        if (!req.body.username || !req.body.first_name || !req.body.last_name || !req.body.password || !emailValidator.validate(req.body.username))
        {
            let response = { statusCode: 400, message: "Please provide all mandatory fields" };
            return response;
        }
        const user = await User.findAll({ where: { username: req.body.username } });
        if (user != "")  {
            let response = { statusCode: 400, message: "User Already Exists Test.." };
            return response;
        };
        req.body.password = bcrypt.hashSync(req.body.password, 10);  
        const newRegistration = new User(req.body)
        await newRegistration.save();
        const secondsSinceEpoch = Math.round(Date.now() / 1000);
        const expirationTime = secondsSinceEpoch + 5 * 60;
        var ddb = new AWS.DynamoDB({ apiVersion: '2012-08-10', region: 'us-east-1' });
        var params = {
            TableName: 'TokenTable',
            Item: {
                'Token': { S: short() },
                'TimeToLive': { N: expirationTime.toString()}
            }
        }
        await ddb.putItem(params).promise();
        const newUser = {
                id:newRegistration.id,
                username: newRegistration.username,
                first_name: newRegistration.first_name,
                last_name: newRegistration.last_name, 
                createdAt: newRegistration.createdAt,
                updatedAt: newRegistration.updatedAt
        };
        let response = { statusCode: 200, message:newUser};
        return response;
        }
    catch (error) {
        let response = { statusCode: 400, message:error};
        return response;
    }
}
export const updateUser = async (req,res,next) => {
    try {
        const returnedValue = await authenticateUser(req, res, next);
        if (returnedValue.statusCode) {
            return returnedValue;
        }
        var user = returnedValue.foundUser;
        if (req.body.password) {
            req.body.password = bcrypt.hashSync(req.body.password, 10); 
        }
        else {
            req.body.password = user[0].dataValues.password;
        }
        if (req.body.createdAt|| req.body.id || req.body.username|| req.body.updatedAt)
        {
            let response = { statusCode: 400, message:"Bad Request"};
            return response;
        }
        if (!req.body.first_name || !req.body.last_name || !req.body.password)
        {
            let response = { statusCode: 400, message:"Bad Request"};
            return response;
        }
        await User.update({
            first_name: req.body.first_name,
            last_name:  req.body.last_name,
            password:   req.body.password
        }, {
            where: {
                username: returnedValue.username
            }
        });
        let response = { statusCode: 204, message:""};
        return response;
        }
    catch (error) {
        console.log("Error" + error);
        let response = { statusCode: 400, message: error};
        return response;
    }
}
export const getParticularUser = async (req,res,next) => {
    try {
        const returnedValue = await authenticateUser(req, res, next);
        if (returnedValue.statusCode) {
            return returnedValue;
        }
        var user = returnedValue.foundUser;
        const existingUser = {
            id:user[0].dataValues.id,
            username: user[0].dataValues.username,
            first_name: user[0].dataValues.first_name,
            last_name: user[0].dataValues.last_name,
            createdAt: user[0].dataValues.createdAt,
            updatedAt: user[0].dataValues.updatedAt,
    };
        let response = { statusCode: 200, message: existingUser };
        return response;
    }
    catch (e) {
        console.log("Error" + e.message);
        let response = { statusCode: 500, message: e.message };
        return response;
    }
}
export const authenticateUser = async(req, res,next)=>
{
    var authHeader = req.headers.authorization;
    if (!authHeader) {
        var err = new Error('You are not authenticated!');
        let response = { statusCode: 401, message: "You are not authenticated!" };
        return response;
    }
    var auth = new Buffer.from(authHeader.split(' ')[1],'base64').toString().split(':');
    var UName = auth[0];
    var pass = auth[1];
    const user = await User.findAll({ where: { username: UName } });
    if (user == "") {
        let response = { statusCode: 401, message: "You are not authenticated!" };
        return response;
    }
    if (UName == user[0].dataValues.username) {
        var password = await bcrypt.compare(pass, user[0].dataValues.password);
        if (!password) 
        {
            let response = { statusCode: 401, message: "You are not authenticated!" };
             return response;
        }
    } else {
        let response = { statusCode: 401, message: "You are not authenticated!" };
        return response;
    }
    let returnedValue={foundUser:user,username:UName}
    return returnedValue;
}


