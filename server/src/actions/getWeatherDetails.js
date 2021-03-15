const request = require('request')

module.exports = async (lat, lon, res, next) => {
    //fetch details
    const url = 'https://api.darksky.net/forecast/eb78a53c4038fad5ac3686352a841951/'+lat+','+lon+'?lang=en'
    console.log(url)

    request({url:url,json:true}, (error,response)=>{
        if(error){
            next('Unable to connect the server!')
        }else if(response.body.error){
            next('Location not found')
        }else{
            res.json({
                "details": response.body.daily.data[0].summary +' There is currently '+response.body.currently.temperature+' degrees out there. There is '+response.body.currently.precipProbability+' % chance of rain.'
            })
        }
    })
}