import {Router} from "express";
import {WarriorRecord} from "../records/warrior.record";

export const arenaRouter = Router()

arenaRouter
    .get('/fight-form', async (req,res) => {
        const warriors = await WarriorRecord.listAll()
        res.render('arena/fight.hbs', {
            warriors
        })
    })
    .post('/fight', (req,res) => {
        res.render('arena/fight-form.hbs')
    })
