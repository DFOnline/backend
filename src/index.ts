import express from 'express';

import { UserAccessArray } from './user/user.js';
import UserRouter from './user/router.js';
import { Config as Configure, Storage } from './util/file.js';
import ScriptStorage from './script/store.js';

const Config = await Configure.get('./public/CONFIG.jsonc');
const Store = new Storage(Config);
await Store.open();
const Scripts = new ScriptStorage(Store);
console.log(Scripts.get('a'))
const UserAccessInstance = new UserAccessArray();

const APP = express();

APP.use('/user',UserRouter);
// APP.use('/template',TemplateRouter);
// APP.use('/script',ScriptRouter);
// APP.use('/plot',PlotRouter);

APP.get('/',(req,res) => {
    res.send('ping')
});

APP.listen(80, () => {
    console.log('App is listening.');
});

export { UserAccessInstance }