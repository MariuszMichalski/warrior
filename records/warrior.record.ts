import { pool } from "../utils/db";
import {ValidationError} from "../utils/errors";
import {v4 as uuid} from "uuid";
import {FieldPacket} from "mysql2";

type WarriorRecordResults = [WarriorRecord[], FieldPacket[]]

export interface WarriorEntity {
    id?: string;
    readonly name: string;
    readonly str: number;
    readonly def: number;
    readonly stamina: number;
    readonly agility: number;
    wins?: number;
}

export class WarriorRecord implements WarriorEntity{
    public id?: string;
    public readonly name: string;
    public readonly str: number;
    public readonly def: number;
    public readonly stamina: number;
    public readonly agility: number;
    public wins?: number;

    constructor(obj: WarriorEntity) {
        const {id, name, str, def, stamina, agility, wins} = obj;

        const sum = [str, def, stamina, agility].reduce((prev,curr) => prev + curr, 0);

        if (sum !== 10) {
            throw new ValidationError(`Sum of all statistics has to be 10. Now its ${sum} `);
        }

        if (name.length < 3 && name.length > 50) {
            throw new ValidationError(`Name must be between 3 and 50 signs. Now its ${name.length}`);
        }

        this.id = id ?? uuid();
        this.name = name;
        this.str = str;
        this.def = def;
        this.stamina = stamina;
        this.wins = wins ?? 0;
    }

    async insert(): Promise<string> {
        await pool.execute("INSERT INTO `warriors`(`id`, `name`, `str`, `def`, `stamina`, `agility`, `wins`) VALUES (:id, :name, :str, :def, :stamina, :agility, :wins)", {
            id: this.id,
            name: this.name,
            str: this.str,
            def: this.def,
            stamina: this.stamina,
            agility: this.agility,
            wins: this.wins,
        });
        return this.id
    }


    async update(): Promise<void> {

    }

    static async getOne(id: string): Promise<WarriorRecord | null> {
        const [results] = await pool.execute("SELECT * FROM `warriors` WHERE `id` = :id", {
            id,
        }) as WarriorRecordResults;
        return results.length === 0 ? null : new WarriorRecord(results[0])
    }

    static async listAll(): Promise<WarriorRecord[]> {
        const [results] = await pool.execute("SELECT * FROM `warriors`") as WarriorRecordResults
        return results.map(obj => new WarriorRecord(obj));
    }

    static async listTop(topCount: number): Promise<WarriorRecord[]> {
        return [];
    }
}