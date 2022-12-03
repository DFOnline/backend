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
    /** We merge and hash the client and server code and export it as hex.
     * This should only exist if the user is known to be valid.
     * ```js
     * SHA256(client,server).hex()
     * ```
     */
    agreedCode: string;
}