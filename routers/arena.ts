import {Router} from "express";
import {WarriorRecord} from "../records/warrior.record";
import {ValidationError} from "../utils/errors";

export const arenaRouter = Router()

arenaRouter
    .get('/fight-form', async (req,res) => {
        const warriors = await WarriorRecord.listAll()
        res.render('arena/fight.hbs', {
            warriors
        })
    })
    .post('/fight', async (req,res) => {

        const {warrior1: warrior1Id, warrior2: warrior2Id} = req.body

        if (warrior1Id === warrior2Id) {
            throw new ValidationError(`You have to choose two different warriors`)
        }

        const warrior1 = await WarriorRecord.getOne(warrior1Id)
        const warrior2 = await WarriorRecord.getOne(warrior2Id)

        if (!warrior1) {
            throw new ValidationError('Cannot find first warrior')
        }
        if (!warrior2) {
            throw new ValidationError('Cannot find second warrior')
        }

        res.render('arena/fight-form.hbs')
    })
