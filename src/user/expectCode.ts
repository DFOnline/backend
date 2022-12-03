import { Router } from "express";

const APP = Router();
export default APP

// Uploads your code for use in code agreement
APP.get('/code',(req,res) => {
    res.send('test')
})