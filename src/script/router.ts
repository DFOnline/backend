import { Scripts } from "../index.js";
import { Response, Router, urlencoded } from "express";
import { AuthorizedRequest } from "user/user.js";

const router = Router();

router.get('/',(_req,res) => {
    res.json(Object.fromEntries(Scripts.get().map(script => [script.getID(), script])));
})

router.get('/:script', urlencoded({extended: true}), (req,res) => {
    const id = req.params['script'];
    if(!Scripts.exists(id)) { res.status(404).send('No script with that ID'); return; }
    res.json(Scripts.get(id));
});

router.get('/:script/verify', urlencoded({extended: true}), (req, res: Response) => {
    const id = req.params['script'];
    const user = (req as any as AuthorizedRequest).user;
    console.log(user);
    if(!Scripts.exists(id)) { res.status(404).send('No script with that ID'); return; }
    const script = Scripts.get(id);
    const verified = !script.getVerified()
    script.setVerified(verified);
    res.json({verified});
})

export default router;