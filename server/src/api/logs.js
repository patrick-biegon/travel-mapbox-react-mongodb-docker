const { Router } = require('express');
const LogEntry = require('../models/logEntry');
const getWeatherDetails = require('../actions/getWeatherDetails')

const router = Router();


router.get('/', async (req, res, next) =>{
    try{
        const entries = await LogEntry.find();
        res.json(entries);
    } catch(error){
        next(error);
    }
});

router.post('/getlocation', async (req, res, next) => {
    try {
        const weatherinfo = await getWeatherDetails(req.body.lat, req.body.lon, res, next);
    } catch (error) {
        console.log(error.name)
        next(error);
    }
})

router.post('/', async (req, res, next) =>{
    try{
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