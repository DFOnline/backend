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
router.get('/:script/raw', urlencoded({extended: true}), (req, res) => {
    const id = req.params['script'];
    if(!Scripts.exists(id)) { res.status(404).send('No script with that ID'); return; }
    res.json(Scripts.get(id).getRaw())
})

router.get('/:script/verify', urlencoded({extended: true}), (req, res: Response) => {
    const id = req.params['script'];
    const user = (req as any as AuthorizedRequest).user?.user;

    if(!user) { res.status(401).send('Not logged in'); return; }
    if(!Scripts.exists(id)) { res.status(404).send('No script with that ID'); return; }

    const script = Scripts.get(id);
    if(script.getVerified() == null) {
        script.setVerified(user.uuid);
    }
    res.send();
})

export default router;