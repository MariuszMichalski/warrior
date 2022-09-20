import {Router} from "express";
import {WarriorRecord} from "../records/warrior.record";
import {ValidationError} from "../utils/errors";

export const warriorRouter = Router()

warriorRouter
    .get('/add-form', (req,res) => {
        res.render('warrior/add-form.hbs')
    })
    .post('/', async (req,res) => {

        if (await WarriorRecord.isNameTaken(req.body.name)) {
            throw new ValidationError(`Name ${req.body.name} is already taken!`)
        }

        const warrior = new WarriorRecord({
            ...req.body,
            str: Number(req.body.str),
            def: Number(req.body.def),
            stamina: Number(req.body.stamina),
            agility: Number(req.body.agility),
        });
        await warrior.insert()
        res.render('warrior/warrior-added.hbs')
    })