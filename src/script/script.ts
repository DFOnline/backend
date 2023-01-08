import { uuid } from "../user/user.js";
import { gunzipSync, gzipSync } from 'zlib';

export default class Script {
    protected owner: uuid;
    protected verified: string | null;
    /** Compressed storage */
    protected compressed: Buffer;

    /**
     * 
     * @param owner UUID of the owner player.
     * @param data Compressed GZIP buffer.
     * @param verified If the script is verified by staff.
     */
    constructor(owner: uuid, data: Buffer, verified: string | null) {
        this.owner = owner;
        this.compressed = data;
        this.verified = verified;
    }

    getOwner() {return this.owner;}
    getVerified() {return this.verified;}
    getCompressed() {return this.compressed;}

    setOwner(owner: string) {this.owner = owner;}
    setVerified(verified: string | null) {this.verified = verified}
    setCompressed(compressed: Buffer) {this.compressed = compressed}

    getRaw(): DFScript {
        return JSON.parse(this.raw);
    }

    get raw(): string {
        return gunzipSync(this.compressed).toString();
    }
    set raw(data: string) {
        this.setCompressed(gzipSync(Buffer.from(data)));
    }

    toJSON() {
        return {
            name: this.getRaw().name,
            owner: this.owner,
            data: this.compressed.toString('base64'),
            verified: this.verified,
        }
    }
}

export interface DFScript {
    name: string
    owner: string
    server: string
    description: string
    actions: any[]
    config: any[]
    disabled: boolean
    version: 4
}