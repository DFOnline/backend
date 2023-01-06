import { Scripts } from "../index.js";
import { Router, urlencoded } from "express";

const router = Router();

router.get('/',(_req,res) => {
    res.send(Object.fromEntries(Scripts.get().map(script => [script.getID(), script])));
})

router.get('/:script',urlencoded({extended: true}), (req,res) => {
    const id = req.params['script'];
    if(!Scripts.exists(id)) { res.status(404).send('No script with that ID'); return; }
    res.send(Scripts.get(id));
});

export default router;