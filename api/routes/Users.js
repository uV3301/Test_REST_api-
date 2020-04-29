const express = require('express')
const router = express.Router();
const mongoose = require('mongoose')
const dataPacket = require('../models/iotDatabase')

router.get('/', (req, res, next)=>{
    dataPacket.find().exec(

    ).then(doc=>{
        console.log(doc);
        res.status(200).json(doc)
    }

    ).catch(err=>{
        console.log(err);
        res.status(500).json({
            message: 'Empty or some unwanted error'
        })
    }

    )
});

router.get('/:id', (req, res, next)=>{
    const id = req.params.id
    dataPacket.findById(id).exec().then(
        doc=>{
            console.log('from cloud database: ',doc);
            if(doc){
                res.status(200).json(doc)
            }else{
                res.status(404).json({
                    message: 'No entries found'
                })
            }
        }
    ).catch(
        err=>{
            console.log(err)
            res.status(500).json({
                error: err,
            })
        }

    )

})

router.delete('/:id', (req, res, next)=>{
    const id = req.params.id
    dataPacket.remove({_id:id}).exec().then(
        doc=>{
            console.log(doc)
            res.status(200).json(doc)
        }
    ).catch(
        err=>{
            res.status(500).json({
                error:err
            })
        }
    )
})

module.exports = router