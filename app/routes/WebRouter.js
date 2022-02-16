import * as healthController from '../controllers/Health.js';
import * as userAccountController from '../controllers/UserAccount.js';
import express from 'express';

const router = express.Router();

router.route('/healthz')
.get(healthController.getServiceHealth)  //If http request is get then request is forwarded to getAllTodoItems controller endpoint
router.route('/v1/user')
.post(userAccountController.createUser) 
router.route('/v1/user/self')   
.put(userAccountController.updateUser) 
router.route('/v1/user/self')
.get(userAccountController.getParticularUser)
export default router;


