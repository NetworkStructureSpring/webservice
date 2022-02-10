import * as healthController from '../controllers/Health.js';
import express from 'express';

const router = express.Router();

router.route('/healthz')
    .get(healthController.getServiceHealth)  //If http request is get then request is forwarded to getAllTodoItems controller endpoint
export default router;


