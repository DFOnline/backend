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
    private readonly clientCode: string;
    /** We give the connecting user our server code */
    readonly serverCode: string;
    /** 
     * We merge and hash the client and server code and export it as hex.  
     * This will be the bearer token.  
     * ```js
     * SHA256(client,server).hex()
     * ```
     */
    commonCode: string;

    /** This is used for verification */
    username: username;

    valid = false;

    constructor(clientCode: string, username: username) {
        this.clientCode = clientCode;
        this.serverCode = randomBytes(16).toString('hex');
        this.username = username;
        this.commonCode = createHash('sha256').update(this.clientCode + this.serverCode).digest('hex');
    }
    /**
     * This assumes whatever uses this trusts the user
     */
    validate(user: User) {
        this.user = user;
        this.valid = true;
    }

    get isValid() {
        return this.serverCode != null;
    }
}

export class UserAccessArray {
    Users: UserAccess[] = [];

    add(user: UserAccess) {
        this.Users.push(user);
    }

    getByUsername(name: username): UserAccess | null {
        const user = this.Users.find(x => x.username === name);
        return user ? user : null
    }

    getByCommonSecret(secret: string): UserAccess | null {
        const user = this.Users.find(x => x.commonCode === secret);
        return user ? user : null
    }
}