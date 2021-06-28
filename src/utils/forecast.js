// Goal: Create a reusable function for getting the forecast
//
// 1. Setup the "forecast" function in utils/forecast.js
// 2. Require the function in app.js and call it as shown below
// 3. The forecast function should have three potential calls to callback:
//    - Low level error, pass string for error
//    - Coordinate error, pass string for error
//    - Success, pass forecast string for data (same format as from before)
const request=require('request')
const forecast=(latitude,longitude,callback)=>{
    const forecasturl='http://api.weatherstack.com/current?access_key=e675e316f2291b108fcc4e2c154f2252&query='+ latitude +','+ longitude +'&units=f'
request({url:forecasturl,json:true},(error,{body})=>{
    if(error)
    {
        callback('unable to find weather service',undefined)
    }else if(body.error)
    {
        callback('unable to find location',undefined)
    }
    else{
        callback(undefined,body.current.weather_descriptions[0]+'.It is currently '+body.current.temperature+' degress out. It feels like '+body.current.precip+ ' degrees out.')
    }
})
}
module.exports=forecast
 latitude:37.8267
longitude:-122.4233