import {WarriorRecord} from "../records/warrior.record";

export const fight = (warrior1: WarriorRecord, warrior2: WarriorRecord): {
    log: string[];
    winner: WarriorRecord;
} => {
    const log: string[] = []

    const warrior1Obj = {
        hp: warrior1.stamina * 10,
        dp: warrior1.def,
        warrior: warrior1,
    }
    const warrior2Obj = {
        hp: warrior2.stamina * 10,
        dp: warrior2.def,
        warrior: warrior2,
    }

    let attacker = warrior1Obj;
    let defender = warrior2Obj;

    do {
        const attackStr = attacker.warrior.str

        if (defender.dp + defender.warrior.agility > attackStr) {
            defender.dp -= attackStr;

            if (defender.dp < 0 ) {
                defender.hp += defender.dp
            }
        }

        [defender, attacker] = [attacker, defender]
    } while (defender.hp > 0)

    const winner = defender.warrior

    return {
        log,
        winner,
    };
};