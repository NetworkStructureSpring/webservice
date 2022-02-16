import express from 'express';
import cookieParser from 'cookie-parser';
import routes from './routes/router.js';
import Sequelize from 'sequelize';

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());

routes(app);  //routing folder

export { app as default };