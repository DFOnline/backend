import Script from "./script.js";
import { Storage } from "../util/file.js";

export default class ScriptStorage {
    private store : Storage;

    constructor(store : Storage) {
        if(!store.isOpen) throw new TypeError('Storage is not open.');
        this.store = store;
    }

    exists(id : string): boolean {
        try {
            this.get(id);
            return true;
        }
        catch {
            return false;
        }
    }

    get() : StoredScript[]
    get(id : string) : StoredScript
    get(id : string | void) : StoredScript | StoredScript[] {
        if(id !== undefined) {
            const script = this.store.get(['scripts',id]);
            if(script == undefined) throw TypeError('This script does not exist.');
            return new StoredScript(this,id,script.owner,Buffer.from(script.data,'base64'),script.verified);
        }
        else {
            return Object.keys(this.store.get(['scripts'])).map(id => this.get(id));
        }
    }
    set(id: string, value: StoredScript | Script) {
        this.store.set(['scripts',id],value.toJSON());
    }
}

export class StoredScript extends Script {
    private store: ScriptStorage;
    private id: string;

    constructor(store: ScriptStorage, id: string, owner: string, data: Buffer, verified: string) {
        super(owner, data, verified);
        this.store = store;
        this.id = id;
    }

    private save() {
        this.store.set(this.id, this);
    }

    getID(): string {
        return this.id;
    }

    setOwner(owner: string) {
        super.setOwner(owner);
        this.save();
    }
    setVerified(verified: string) {
        super.setVerified(verified);
        this.save();
    }
    setCompressed(compressed: Buffer) {
        this.setCompressed(compressed);
        this.save();
    }
}