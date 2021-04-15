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
            console.log(res.json);
            res.json({
                "Summary": response.body.daily.data[0].icon,
                "temperature":' 🌡️ =  '+response.body.currently.temperature+' degree fahrenheit.',
                "rain":  ' 🌧️ = ' +response.body.currently.precipProbability+' % '
            })
        }
    })
}