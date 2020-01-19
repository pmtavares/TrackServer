const express = require('express');
const mongoose = require('mongoose');
const requireAuth = require('../middlewares/requireAuth');

const Track = mongoose.model('Track');


const router = express.Router();

router.use(requireAuth);

router.get('/tracks', async (req, res) =>{
    console.log(req);
    const tracks = await Track.find({userId: req.user._id});
    console.log(tracks);

    res.send(tracks);
});

router.post('/tracks', async (req, res) =>{
    const {name, locations} = req.body;
    //validation here
    if(!name || !locations)
    {
        return res.status(422).send({error: "Must send name and location"});
    }

    try{
        const track = new Track({
            name: name,
            locations: locations,
            userId: req.user._id
        });
        await track.save();
        res.send(track);
    }
    catch(err)
    {
        res.status(422).send({error: err})
    }
})

module.exports = router;
