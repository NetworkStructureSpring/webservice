import webRouter from './WebRouter.js';

export default (app) => {
    app.use('/', webRouter);
};