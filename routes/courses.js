const Joi = require('joi')
const { Router } = require('express')
const router = Router()
const Course =  require('../model/Course')
const modelUser = new Course()

router.get('/', async (req, res) => {
    const data = await modelUser.getData()

    res.status(200).send(data.courses)
})

router.get('/courses', (req, res) => {
    const course = course.find(val => val.age === +req.query.age)
    res.status(200).send(user)
})

router.get('/:id', (req, res) => {
    const course = users.find(val => val.id === +req.params.id)
    res.status(200).send(course)
})

router.post('/add', async (req, res) => {
    const check = validation(req.body)

    if (!!check.error) {
        return res.status(400).send('Error')
    }

    const user = {
        name: req.body.name,
        price: req.body.price
    }

    await modelUser.create(user)

    res.status(201).send('User created')
})

function validation(body){
  const schema = Joi.object({
    name: Joi.string().trim().required().min(2),
    price: Joi.number().integer().required().min(100),
  });

    return schema.validate(body)
}

// delete // update
router.delete('/delete/:id', async (req, res) => {
    const data = await modelUser.getData()
    const id = +req.params.id
    const idx = data.courses.findIndex((val) => val.id === id)

    if (idx < 0) {
        return res.status(400).send('Id not found')
    }

    data.courses.splice(idx, 1)

    await modelUser.save(data)

    res.status(200).send('User deleted')
})

router.put('/update/:id', async (req, res) => {
    const id = +req.params.id;
    const data = await modelUser.getData();
    const idx = data.courses.findIndex((val, index) => val.id = id);
    if (idx < 0) {
        return res.status(400).send('Id not found')
    }
    
    if(!req.body.name){
        req.body.name = data.courses[idx].name
    }

    if(!req.body.price){
        req.body.price = data.courses[idx].price
    }

    req.body.id = id 

    data.courses[idx] = req.body

    await modelUser.save(data)

    res.status(200).send('User updated')
})

module.exports = router