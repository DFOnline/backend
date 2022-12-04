import { json, Request, Response, Router, urlencoded } from "express";
import { UserAccessInstance } from "../index.js";
import User, { UserAccess } from "./user.js";
import addDashes from 'add-dashes-to-uuid';

const router = Router();
export default router;

router.post('/secret',json(),(req: Request, res: Response) => {
    const { client, name } = req.body;
    if((typeof client) !== 'string') { res.status(400).send('No value `client`'); return; }
    if((typeof name  ) !== 'string') { res.status(400).send('No value `name`'  ); return; }
    const userAccess = new UserAccess(client,name);
    UserAccessInstance.add(userAccess);
    res.send({'serverCode': userAccess.serverCode});
});

router.get('/verify/:commonSecret',urlencoded({extended: true}),async (req: Request, res: Response) => {
    const { commonSecret } = req.params;
    if((typeof commonSecret) !== 'string') { res.status(400).send('No param `commonSecret`'); return; }
    const user = UserAccessInstance.getByCommonSecret(commonSecret);
    if(        user          === null    ) { res.status(401).send('Invalid user'           ); return; }
    const request = await fetch(`https://sessionserver.mojang.com/session/minecraft/hasJoined?username=${user.username}&serverId=${user.commonCode?.substring(0,30)}`,{headers: {'Accept': 'application/json'}});
    try {
        const body = await request.json();
        const uuid = addDashes(body.id);
        user.validate(new User(body.name, uuid));
        res.status(204).send();
    }
    catch(e) {
        res.status(500).send('An error occurred whilst contacting Mojang')
    }
});