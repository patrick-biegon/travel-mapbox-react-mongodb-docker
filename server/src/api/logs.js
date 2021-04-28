const { Router } = require('express');
const LogEntry = require('../models/logEntry');
const getWeatherDetails = require('../actions/getWeatherDetails')
const { auth } = require('../middlewares');
const router = Router();


router.get('/', auth, async (req, res) =>{
    try{
        let entries;
        if(req.query.type == "public") entries = await LogEntry.find({ isPublic: true })
        else entries = await LogEntry.find({ userid: req.user._id });
        res.json(entries);
    } catch(error){
        res.sendStatus(501).json({error: error.message})
    }
});

router.post('/getlocation', auth, async (req, res, next) => {
    try {
        const weatherinfo = await getWeatherDetails(req.body.lat, req.body.lon, res, next);
    } catch (error) {
        console.log(error.name)
        next(error);
    }
})

router.post('/', auth, async (req, res, next) =>{
    try{
        req.body.userid = req.user._id;
        if(req.body.type == "public") req.body.isPublic = true;
        else req.body.isPublic = false;
        const logEntry = new LogEntry(req.body);
        const createdEntry = await logEntry.save();
        res.json(createdEntry);
    } catch (error){
        console.log(error.name);
        if(error.name === 'ValidationError'){
            res.status(422);
        }
        next(error);
    }
    
});

module.exports = router;