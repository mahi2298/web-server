const path=require('path')
const express=require('express')
const hbs=require('hbs')
const fetch=require('node-fetch')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')
//const { response } = require('express')
const request=require('request')
const app=express()
const port=process.env.PORT || 3000
//to setup paths
const pathdirectory=path.join(__dirname,'../public')
const viewsdirectory=path.join(__dirname,'../templates/views')
const partialspath=path.join(__dirname,'../templates/partials')
//console.log(viewsdirectory)
//to setup handlers
app.set('views', viewsdirectory)
app.set('view engine','hbs')
hbs.registerPartials(partialspath)
//to setup static directory
app.use(express.static(pathdirectory))
app.get('',(req,res)=>{
    res.render('index',{
        title:'weather page',
        name:'Mahi'
    })
})
// app.get('',(req,res)=>{
//     res.send('<h1>weather</h1>')
// })
app.get('/help',(req,res)=>{
    res.render('help',{
        title:'HELP',
        name:'created by chanti'
    })
})
// app.get('/about',(req,res)=>{
//     res.send('<h1>ABOUT</h1>'
// })
app.get('/about',(req,res)=>{
    res.render('about',{
        title:'Forecast',
        name:'created by vani'
    })
})
app.get('/products',(req,res)=>{
    if(!req.query.search)
    {
       return res.send({
            error:'You must provide a search item'
        })
    }
    console.log(req.query.search)
    res.send({
        products:[]
    })
})
app.get('/weather',(req,res)=>{
    if(!req.query.address)
    {
        return res.send({
            error:'You must provide a valid address'
        })
    }
geocode(req.query.address,(error,{latitude,longitude,location})=>{
    if(error)
    {
        return res.send({error})
    }
    forecast(latitude,longitude,(error,forecastData)=>{
        if(error)
        {
            return res.send({error})
        }
        res.send({
            forecast:forecastData,
            location,
            address:req.query.address
         })
    })
})
    //console.log(req.query.address)
    //  res.send({
    //     forecast:forecastData,
    //     location,
    //     address:req.query.address
    //  })
    
    /*res.send({
        forecast:'It is snowing',
        Location:'Los Angeles',
        address:req.query.address
    })*/
})
app.listen(port,()=>{
    console.log('Server is Starting up and Running '+port)
})
// app.listen(3000,()=>{
//     console.log('Server is starting up 3000')
// })