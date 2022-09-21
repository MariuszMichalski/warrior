import {Router} from "express";
import {WarriorRecord} from "../records/warrior.record";
import {ValidationError} from "../utils/errors";

export const warriorRouter = Router()

warriorRouter
    .get('/add-form', (req,res) => {
        res.render('warrior/add-form.hbs')
    })
    .post('/', async (req,res) => {

        const {str, stamina, def, agility, name} = req.body;

        if (await WarriorRecord.isNameTaken(name)) {
            throw new ValidationError(`Name ${name} is already taken!`)
        }

        const warrior = new WarriorRecord({
            ...req.body,
            str: Number(str),
            def: Number(def),
            stamina: Number(stamina),
            agility: Number(agility),
        });
        await warrior.insert()

        res.render('warrior/warrior-added.hbs', {
            id: warrior.id,
            name: warrior.name,
        })
    })