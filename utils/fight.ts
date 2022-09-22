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

        log.push(`${attacker.warrior.name} will attack ${defender.warrior.name} with ${attackStr} strength`)

        if (defender.dp + defender.warrior.agility > attackStr) {
            defender.dp -= attackStr;

            log.push(`${defender.warrior.name} defend against ${attacker.warrior.name}`)

            if (defender.dp < 0 ) {

                log.push(`${attacker.warrior.name} broke defence ${defender.warrior.name} with ${-defender.dp} `)
                defender.hp += defender.dp
            }
        } else {
            log.push(`${attacker.warrior.name} hit ${defender.warrior.name} by ${attackStr}`)
            defender.hp -= attackStr;
        }

        [defender, attacker] = [attacker, defender]
    } while (defender.hp > 0)

    const winner = defender.warrior
    log.push(`${winner.name} won!`)

    return {
        log,
        winner,
    };
};