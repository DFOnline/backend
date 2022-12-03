import { NetworkError } from "../Errors.js";
import { username, uuid } from "../user/user.js";

export async function getUserName(uuid: uuid): Promise<username> {
    const request = await fetch(`https://sessionserver.mojang.com/session/minecraft/profile/${uuid.replace(/-/g,'')}`);
    if(request.status !== 200) throw new NetworkError(`Unexpected request status (${request.status})`);
    const body = await request.json();
    if(!('name' in body)) throw new TypeError('Could not find `name` in the body');
    return body.name;
}