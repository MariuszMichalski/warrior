import {ValidationError} from "../utils/errors";

export class WarriorRecord {
    public id?: string;
    public readonly name: string;
    public readonly str: number;
    public readonly def: number;
    public readonly stamina: number;
    public readonly agility: number;
    public wins?: number;

    constructor(obj: WarriorRecord) {
        const {id, name, str, def, stamina, agility, wins} = obj;

        const sum = [str, def, stamina, agility].reduce((prev,curr) => prev + curr, 0);

        if (sum !== 10) {
            throw new ValidationError(`Sum of all statistics has to be 10. Now its ${sum} `);
        }

        if (name.length < 3 && name.length > 50) {
            throw new ValidationError(`Name must be between 3 and 50 signs. Now its ${name.length}`);
        }

        this.id = id;
        this.name = name;
        this.str = str;
        this.def = def;
        this.stamina = stamina;
        this.wins = wins;
    }

    async insert() {

    }

    async update() {

    }

    static async getOne(id: string) {

    }
    static async listAll() {

    }
    static async listTop(topCount: number) {

    }
}