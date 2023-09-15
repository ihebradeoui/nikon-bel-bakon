const mongoose  = require('mongoose');
const Schema = mongoose.Schema(
    {
        name: String,
        description: String,
        date: String,
        location: String,
        seats: Number,
        availableSeats: Number,
        imageUrl: String,
    }
    
)
const Event = mongoose.model('Event', Schema);
module.exports = Event;
