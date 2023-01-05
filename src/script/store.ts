import Script from "./script.js";
import { Storage } from "../util/file.js";

export default class ScriptStorage {
    private store : Storage;

    constructor(store : Storage) {
        if(!store.isOpen) throw new TypeError('Storage is not open.');
        this.store = store;
    }

    get(id : string) {
        const script = this.store.get(['scripts',id]);
        if(script == undefined) throw TypeError('This script does not exist.');
        return new StoredScript(this,id,script.owner,Buffer.from(script.data,'base64'),script.verified);
    }
    set(id: string, value: StoredScript | Script) {
        this.store.set(['scripts',id],value);
    }
}

export class StoredScript extends Script {
    private store: ScriptStorage;
    private id: string;

    constructor(store: ScriptStorage, id: string, owner: string, data: Buffer, verified: boolean) {
        super(owner, data, verified);
        this.store = store;
        this.id = id;
    }

    private save() {
        this.store.set(this.id, this);
    }

    setOwner(owner: string) {
        super.setOwner(owner);
        this.save();
    }
    setVerified(verified: boolean) {
        super.setVerified(verified);
        this.save();
    }
    setCompressed(compressed: Buffer) {
        this.setCompressed(compressed);
        this.save();
    }
}