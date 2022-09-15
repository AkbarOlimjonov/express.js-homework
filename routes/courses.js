const { Router } = require('express')
const router = Router()
const db = require('../db')
const Joi = require('joi')



router.post('/add', (req, res) => {

    const schema = Joi.object({
        name: Joi.string().trim().required().min(2),
        price: Joi.number().integer().required().min(100)
    })

    const validation = schema.validate(req.body)

    if (!!validation.error) {
        return res.status(400).send(validation.error.message)
    }


    const course = {
        name: req.body.name,
        price:req.body.price,
        id: db.courses.length + 1
    }

    db.courses.push(course)
    res.status(201).send('Course added')
})


router.get('/',(req,res)=>{
    res.send(db.courses)
})

router.put('/:name',(req,res)=>{
    const course = db.courses.find(val => val.name === req.params.name)
   
    course.name = req.body.name
   
    return res.send('Course update');
})

router.delete('/:name',(req,res)=>{
    const course = db.courses.find(val => val.name === req.params.name)
   
    db.courses.splice(course,1)
   
    return res.send('Course delete');
})





module.exports = router