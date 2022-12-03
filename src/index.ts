import express from 'express';

import { getUserName } from './util/MojangAPI.js';

const APP = express();

APP.get('/',(req,res) => {
    res.send('ping')
});

console.log(await getUserName('4566e69fc90748ee8d71d7ba5aa00d20'))

APP.listen(80, () => {
    console.log('App is listening.')
});