const mongoose = require('mongoose');

const iotDatabase = mongoose.Schema({
    _id: mongoose.Schema.Types.ObjectId,
    duration: Number,
    parkedbit: Boolean,
    fee: Number
})
module.exports = mongoose.model('sensor', iotDatabase )