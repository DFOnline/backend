import express from 'express';

import { Config as Configure, Storage } from './util/file.js';
import { UserAccessArray } from './user/user.js';
import UserRouter from './user/router.js';
import ScriptRouter from './script/router.js';
import ScriptStorage from './script/store.js';

const Config = await Configure.get('./public/CONFIG.jsonc');
const Store = new Storage(Config);
await Store.open();
const Scripts = new ScriptStorage(Store);
const UserAccessInstance = new UserAccessArray();

const APP = express();

APP.use('/user',UserRouter);
// APP.use('/template',TemplateRouter);
APP.use('/script',ScriptRouter);
// APP.use('/plot',PlotRouter);

APP.get('/',(req,res) => {
    res.send('ping')
});

APP.listen(Config.port, () => {
    console.log('App is listening.');
});

export { UserAccessInstance, Scripts }