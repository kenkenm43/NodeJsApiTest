const express = require('express')
const router = express.Router()
const users = require('../../User')
const uuid = require('uuid')

router.get('/',(req,res) => {
    res.json(users)
})

router.get('/:id',(req,res) => {
    const found = users.some(user => user.id === parseInt(req.params.id))
    if (found) {
        res.json(users.filter(user => user.id === parseInt(req.params.id)))
    } else {
        res.status(400).json({msg: `No users with the id of ${req.params.id}`})
    }
})

router.post('/',(req,res) => {
    const newUser = {
        id: uuid.v4(),
        name: req.body.name,
        email: req.body.email
    }

    if (!newUser.name || !newUser.email) {
        return res.status(400).json({msg:'Please include a name and email'})
    }

    users.push(newUser)
    res.send(req.body)
})

router.put('/:id',(req,res)=>{
    const found = users.some(user => user.id === parseInt(req.params.id))

    if (found) {
        const updUser = req.body
        users.forEach(user=>{
            if(user.id == parseInt(req.params.id)){
                user.name = updUser.name ? updUser.name : user.name
                user.email = updUser.email ? updUser.email : user.name

                res.json({msg:'User updated',user})
            }
        })
    }else {
        res.status(400).json({msg: `No user with the id of ${req.params.id}`})
    }
})

router.delete('/:id',(req,res) => {
    const found = users.some(user => user.id === parseInt(req.params.id))

    if(found){
        res.json({
            msg:'Member deleted',
            users: users.filter(user=>user.id !== parseInt(req.params.id))
        })
    }else{
        res.status(400).json({msg:`No user with the id of ${req.params.id}`})
    }
})

module.exports = router