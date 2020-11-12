const mongoose = require('mongoose');

const { Schema, model } = mongoose;

const NinjaSchema = new Schema({
    name: {
        type: String,
        required: [true, 'Name field is required!']
    },
    rank: {
        type: String,
        required: [true, 'Rank field is required!']
    },
    description: {
        type: String
    },
    available: {
        type: Boolean,
        default: false
    }
    // add geo location
});

const Ninja = model('ninja', NinjaSchema);

module.exports = Ninja;