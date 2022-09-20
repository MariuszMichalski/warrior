import {Router} from "express";
import {WarriorRecord} from "../records/warrior.record";

export const warriorRouter = Router()

warriorRouter
    .get('/add-form', (req,res) => {
        res.render('warrior/add-form.hbs')
    })
    .post('/', (req,res) => {
        const warrior = new WarriorRecord({
            ...req.body,
            str: Number(req.body.str),
            def: Number(req.body.def),
            stamina: Number(req.body.stamina),
            agility: Number(req.body.agility),
        })
        res.render('warrior/warrior-added.hbs')
    })