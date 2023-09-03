const mongoose  = require('mongoose');
const Schema = mongoose.Schema(
    {
        eventId: String,
        user: String,
    }
    
)
const BookedEvent = mongoose.model('BookedEvent', Schema);
module.exports = BookedEvent;
