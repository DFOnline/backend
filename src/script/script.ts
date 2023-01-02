import { uuid } from "../user/user.js";
import { gunzipSync, gzipSync } from 'zlib';

class Script {
    owner: uuid;
    verified: boolean;

    compressed: Buffer;

    /**
     * 
     * @param owner UUID of the owner player.
     * @param data Compressed GZIP buffer.
     * @param verified If the script is verified by staff.
     */
    constructor(owner: uuid, data: Buffer, verified = false) {
        this.owner = owner;
        this.compressed = data;
        this.verified = verified;
    }

    get raw(): string {
        return gunzipSync(this.compressed).toString();
    }
    set raw(data: string) {
        this.compressed = gzipSync(Buffer.from(data));
    }
}