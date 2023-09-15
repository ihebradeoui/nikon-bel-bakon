const mongoose  = require('mongoose');
const Schema = mongoose.Schema(
    {
        eventId: String,
        userId: String,
        seatsTaken : Number,
    }
    
)
const BookedEvent = mongoose.model('BookedEvent', Schema);
module.exports = BookedEvent;
