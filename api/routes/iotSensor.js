const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');

const dataPacket = require('../models/iotDatabase')

router.post('/', (req, res, next)=>{
    const dur = req.body.duration
    const fees = dur*10;
    const packet  = new dataPacket({
        _id: mongoose.Types.ObjectId(),
        duration: req.body.duration,
        parkedbit: req.body.parkedbit,
        fee: fees
    })
    packet.save().then(result=>{
        console.log(result);
        res.status(201).json({
            message: 'Handling POST requests',
            createdProduct: result,
        })
    }).catch(err=>{
        console.log(err);
        res.status(500).json({
            error: err
        });
    })
    
});

router.patch('/:ID', (req, res, next)=>{
    const id = req.params.ID;       
    const structure ={};
    for(const obj of req.body){
        structure[obj.name] = obj.change;
    }
    dataPacket.update({_id: id}, {$set: structure}).exec().then(
        result=>{
            console.log(result);
            res.status(200).json(result);
        }
    ).catch(
        err=>{
            console.log(err);
            res.status(500).json({
                error: err
            })
        }
    );
});
module.exports = router;