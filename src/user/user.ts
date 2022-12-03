import { randomBytes, createHash } from 'crypto';

export type username = string;
export type uuid     = string;

export default class User {
    username: username;
    uuid:     uuid    ;

    constructor(username : username, uuid : uuid) {
        this.username = username;
        this.uuid     = uuid    ;
    }
}

export class UserAccess {
    user: User;
    /** Connecting user gives us the client code */
    clientCode: string;
    /** We give the connecting user our server code */
    serverCode: string;
    /** 
     * We merge and hash the client and server code and export it as hex.  
     * This should only exist if the user is known to be valid.  
     * This will be the bearer token.  
     * ```js
     * SHA256(client,server).hex()
     * ```
     */
    commonCode: string | null;

    constructor(clientCode: string) {
        this.clientCode = clientCode;
        this.serverCode = randomBytes(16).toString('hex');
    }
    validate(user: User) {
        this.user = user;
        this.commonCode = createHash('sha256').update(this.clientCode).update(this.serverCode).digest('hex');
    }

    get isValid() {
        return this.serverCode != null;
    }
}

export class UserAccessTable {
    private users: UserAccess[];
}