import express from 'express';

import { UserAccess, UserAccessArray } from './user/user.js';
import UserRouter from './user/router.js';

const UserAccessInstance = new UserAccessArray();

const APP = express();

APP.use('/user',UserRouter);

APP.get('/',(req,res) => {
    res.send('ping')
});

APP.listen(80, () => {
    console.log('App is listening.')
});

export { UserAccessInstance }