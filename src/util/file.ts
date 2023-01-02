import { readFile, writeFile } from 'fs/promises'
import { jsonc } from "jsonc"

export class Config {
    private data: {
        store: string;
    }

    get storagePath(): string {
        return this.data.store;
    }

    private constructor (data : string) {
        const parsed = jsonc.parse(data);
        if(typeof parsed.store !== 'string') throw TypeError("Value `store` is not a string.");
        this.data = {
            'store': parsed['store']
        }
    }

    static async get(path: string): Promise<Config> {
        const file = await readFile(path);
        return new Config(file.toString());
    }
}

export class Storage {
    private path: string | null = null;
    private data: {}

    public isOpen: boolean;

    constructor(path: string)
    constructor(config: Config)
    constructor(pathPos: string | Config) {
        if(pathPos instanceof Config) this.path = pathPos.storagePath;
        if(typeof pathPos === 'string') this.path = pathPos;
        if(this.path === null) throw TypeError('Could not get the path for the storage');
        this.isOpen = false;
    }

    async open() {
        if(this.path === null) throw TypeError('The path is null');
        const file = await readFile(this.path);
        this.data = JSON.parse(file.toString());
        this.isOpen = true;
    }

    async save() {
        if(!this.isOpen) throw Error('Run Storage.open() first, the storage is not open');
        if(this.path === null) throw TypeError('The path is null');
        await writeFile(this.path,JSON.stringify(this.data));
    }

    set(path: (string | number)[], value: any) {
        if(!this.isOpen) throw Error('Run Storage.open() first, the storage is not open.');
        const last = path.splice(path.length - 1, 1)[0];
        let obj: any = this.data;
        for (const i of path) {
            obj = obj[i];
        }
        obj[last] = value;
    }
    get(path: (string | number)[]): any {
        if(!this.isOpen) throw Error('Run Storage.open() first, the storage is not open.');
        let obj: any = this.data;
        for(const i of path) {
            obj = obj[i];
            if(obj === undefined) return undefined;
        }
        return obj;
    }
}