const express = require('express');
const mongoose = require('mongoose');
const User = mongoose.model('User');
const jwt = require('jsonwebtoken');

const router = express.Router();


router.post('/signup', async (req, res)=> {
    console.log(req.body);
    try{
        const {email, password} = req.body;

        const user = new User({email, password});
    
        await user.save();

        const token = jwt.sign({userId: user._id}, 'MY_SECRET_KEY' );
        res.send({'token':  token});
    }
    catch(err)
    {
        console.log("Erro is: "+ err.message);
        return res.status(422).send(err.message);
    }

});


module.exports = router;
