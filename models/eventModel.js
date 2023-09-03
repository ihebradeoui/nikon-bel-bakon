const mongoose  = require('mongoose');
const Schema = mongoose.Schema(
    {
        name: String,
        description: String,
        date: String,
        location: String,
    }
    
)
const Event = mongoose.model('Event', Schema);
module.exports = Event;
