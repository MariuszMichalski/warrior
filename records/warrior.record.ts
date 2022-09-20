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

        const stats = [str, def, stamina, agility]

        const sum = stats.reduce((prev,curr) => prev + curr, 0);

        for (const stat of stats) {
            if (stat < 1) {
                throw new ValidationError('each stat must have at least 1 point')
            }
        }

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
        this.agility = agility;
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

        return this.id;
    }


    async update(): Promise<void> {
        await pool.execute("UPDATE `warriors` SET `wins` = :wins", {
            wins: this.wins
        })
    }

    static async getOne(id: string): Promise<WarriorRecord | null> {
        const [results] = await pool.execute("SELECT * FROM `warriors` WHERE `id` = :id", {
            id: id,
        }) as WarriorRecordResults;
        return results.length === 0 ? null : results[0];
    }

    static async listAll(): Promise<WarriorRecord[]> {
        const [results] = await pool.execute("SELECT * FROM `warriors`") as WarriorRecordResults
        return results.map(obj => new WarriorRecord(obj));
    }

    static async listTop(topCount: number): Promise<WarriorRecord[]> {
        const [results] = await pool.execute("SELECT * FROM `warriors` ORDER BY `wins` DESC LIMIT :topCount", {
            topCount: topCount,
        }) as WarriorRecordResults
        return results.map(obj => new WarriorRecord(obj));
    }

    static async isNameTaken(name: string): Promise<boolean> {
        const [results] = await pool.execute("SELECT * FROM `warriors` WHERE `name` = :name", {
            name: name,
        }) as WarriorRecordResults;

        return results.length > 0
    }
}
