const mongoose  = require('mongoose');
const Schema = mongoose.Schema(
    {
        name: String,
        email: String,
        password: String,
        role : String,
    }
    
)
const User = mongoose.model('User', Schema);
module.exports = User;