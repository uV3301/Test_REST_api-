const express = require('express');
const morgan = require('morgan');
const bodyparser = require('body-parser')
const mongoose = require('mongoose')

const iotRoute = require('./api/routes/iotSensor')
const UserRoute = require('./api/routes/Users')


const app = express();

app.use(morgan('dev'));
app.use(bodyparser.urlencoded({extended: false}));
app.use(bodyparser.json());


mongoose.connect('mongodb+srv://Yuvraj:'+process.env.atlas_pw +'@3mdshephard-lq274.mongodb.net/test?retryWrites=true&w=majority',{
    useUnifiedTopology: true
})

app.use((req, res, next)=>{
    res.header("Access-Control-Allow-Origin", '*');
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept, Authorization"
    );
    if(req.method === 'OPTIONS'){
        res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, PATCH, DELETE')
        return res.status(200).json({});
    }
    next();
});
app.use('/iotSensor', iotRoute )
app.use('/Users', UserRoute)


app.use((req, res, next)=>{
    const error = new Error('Not found!');
    res.status(404);
    next(error);
});
app.use((error, req, res, next)=>{
    res.status(error.status || 500),
    res.json({
        error:{
            message: error.message
        }
    });
});


module.exports = app;