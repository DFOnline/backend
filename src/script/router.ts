import { Router, urlencoded } from "express";

const router = Router();

router.get('/:script',urlencoded({extended: true}), (req,res) => {
    req.params['script']
})