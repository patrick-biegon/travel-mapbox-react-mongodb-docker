const express = require('express');
const User = require('../models/user');
const router = new express.Router();
const auth = require('../middlewares');

router.post('/create', async (req, res) => {
    const user = new User(req.body);

    try{
        await user.save();
        const token = await user.getAuthToken();
        res.status(201).send({user, token});
    }catch(e){
        console.log(e)
        res.status(400).send(e);
    }
});

router.post('/login', async(req, res) => {
    try{
        const user = await User.findByCredentials(req.body.email, req.body.password);
        const token = await user.getAuthToken();
        res.send({user, token});
    }catch(e){
        res.status(404).send(e);
    }
})

module.exports = router;