import { uuid } from "../user/user.js";
import { gunzipSync, gzipSync } from 'zlib';

export default class Script {
    protected owner: uuid;
    protected verified: boolean;
    /** Compressed storage */
    protected compressed: Buffer;

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

    getOwner() {return this.owner;}
    getVerified() {return this.verified;}
    getCompressed() {return this.compressed;}

    setOwner(owner: string) {this.owner = owner;}
    setVerified(verified: boolean) {this.verified = verified;}
    setCompressed(compressed: Buffer) {this.compressed = compressed}

    get raw(): string {
        return gunzipSync(this.compressed).toString();
    }
    set raw(data: string) {
        this.setCompressed(gzipSync(Buffer.from(data)));
    }


    toJSON() {
        return {
            owner: this.owner,
            verified: this.verified,
            data: this.compressed.toString('base64')
        }
    }
}