import {Router} from "express";

export const warriorRouter = Router()

warriorRouter
    .get('/add-form', (req,res) => {
        res.render('warrior/add-form.hbs')
    })
    .post('/', (req,res) => {
        res.render('warrior/warrior-added.hbs')
    })