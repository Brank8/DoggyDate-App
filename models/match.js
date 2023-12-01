const mongoose = require('mongoose');

const Schema = mongoose.Schema

const matchSchema = new mongoose.Schema({
    doggie1: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Dog'
    },
    doggie2: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Dog'
    },

})

module.exports = mongoose.model('Match', matchSchema)
