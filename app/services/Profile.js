import multer from 'multer';
import aws from 'aws-sdk';
import multerS3 from 'multer-s3';
import * as user from '../services/Health.js'
import Profile from "../Models/Profile.js";
import dotenv from 'dotenv';
dotenv.config(); 

var globalFileName = "";
aws.config.update({
  secretAccessKey: process.env.AWS_ACCESS_KEY_SECRET,
  accessKeyId: process.env.AWS_ACCESS_KEY_ID
});
const s3 = new aws.S3();
export const setFileName = async (req, res,name) => {
    globalFileName = name;
}
const fileFilter = (req, file, cb) => {
  if (file.mimetype === 'image/jpeg' || file.mimetype === 'image/png' || file.mimetype === 'image/jpg') {
      cb(null, true)
  } else {
      cb(new Error('Invalid Mime Type, only JPEG,jpg and PNG'), false);
  }
}
export const upload = multer({
  fileFilter,
  storage: multerS3({
    s3,
    bucket: process.env.S3_BUCKET_NAME,
    acl: 'private',
    metadata: function (req, file, cb) {
        cb(null,
            { uploadDate: globalFileName });
      },
      key: function (req, file, cb) {
        cb(null, globalFileName+'.jpg')
      },
      ContentType: "image/jpeg"
  })
})

export const authenticateUser = async(req, res,next) => {
    const returnedValue = await user.authenticateUser(req, res, next);
    if (returnedValue!=undefined) {
        return returnedValue;
    }
}

export const saveToDatabase = async (req, res, returnValue) => {
    try {
        const profile = await Profile.findAll({ where: { user_id: returnValue.foundUser[0].dataValues.id } });
        const newRegistration1 = {
            file_name: req.file.originalname,
            url: req.file.location,
            upload_date: new Date(),
            user_id: returnValue.foundUser[0].dataValues.id,
        };
        const newRegistration = new Profile(newRegistration1)
        if (profile != "")  {
            await Profile.update({
                file_name: req.file.originalname,
                url: req.file.location,
                upload_date: new Date(),
            }, {
                where: {
                    user_id: returnValue.foundUser[0].dataValues.id
                }
            });
            let response = { statusCode: 200, message:newRegistration};
            return response;
        };
        
        await newRegistration.save();
        let response = { statusCode: 200, message:newRegistration};
        return response;
    }
    catch (e)
    {
        let response = { statusCode: 400, message:e};
        return response;
    }
}

export const getProfilePic = async (req, res, returnValue) => {
    const profile = await Profile.findAll({ where: { user_id: returnValue.foundUser[0].dataValues.id } });
    if (profile == "")  {
        let response = { statusCode: 400, message: "Profile Picture Does not exist" };
        return response;
    }
    let response = { statusCode: 200, message: profile };
        return response;
}

export const deleteProfilePic = async (req, res, returnValue) => {
    const profile = await Profile.findAll({ where: { user_id: returnValue.foundUser[0].dataValues.id } });
    if (profile == "")  {
        let response = { statusCode: 400, message: "Profile Picture Does not exist" };
        return response;
    }
    await Profile.destroy({ where: { user_id: returnValue.foundUser[0].dataValues.id } });
     s3.deleteObject({
        Bucket:  process.AWS_BUCKET_NAME,
        Key: returnValue.foundUser[0].dataValues.id+'.jpg'
      },function (err,data){})
    let response = { statusCode: 200, message: "Picture Deleted" };
    return response;
}
