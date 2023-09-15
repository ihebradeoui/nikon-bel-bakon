const express = require('express')
const cors = require('cors')
const mongoose = require('mongoose')
const Event = require('./models/eventModel');
const BookedEvent = require('./models/bookedEventModel');
const User = require('./models/userModel');
const app = express()
const port = 3000


const corsOptions = {
    origin: '*',
    optionsSuccessStatus: 200,
  }
app.use(cors(corsOptions));
app.use(express.json());
//routes 

app.get('/', cors(corsOptions),(req, res) => {
  res.send('Hello Worldss!')
})
app.get('/blog', (req, res) => {
    res.send('Hello blog!')
  })

  //get method that returns user id if username and password exist
app.get('/login/:username/:password',cors(), async(req, res) => {
    try
    {
        const user = await User.findOne({email:req.params.username,password:req.params.password});
        // if(!user)
        //  res.status(404).send("user not found");
        res.status(200).json(user);
    }
    catch (err) {
        res.status(500).json(err);
    }
}
)

    
  
//create event
app.post('/event',cors(), async(req, res) => {
    try 
    {
        const event = await Event.create(req.body);
        res.status(200).json(event);
    }
    catch (err) {
        res.status(500).json(err);
    }
  })

//get all events
app.get('/event',cors(), async(req, res) => {
    try 
    {
        const events = await Event.find({});
        res.status(200).json(events);
    }
    catch (err) {
        res.status(500).json(err);
    }
  })
//get event by id
app.get('/event/:id',cors(), async(req, res) => {
    try 
    {
        const event = await Event.findById(req.params.id);
        res.status(200).json(event);
    }
    catch (err) {
        res.status(500).json(err);
    }
  })
//update event by id
app.put('/event/:id',cors(), async(req, res) => {
    try 
    {
        const event = await Event.findByIdAndUpdate(req.params.id,req.body);
        if(!event)
         res.status(404).send("event not found");
        const updatedEvent = await Event.findById(req.params.id);
        res.status(200).json(updatedEvent);    
    }
    catch (err) {
        res.status(500).json(err);
    }
}  
)

//delete event by id
app.delete('/event/:id',cors(), async(req, res) => {
    try 
    {
        const event = await Event.findByIdAndDelete(req.params.id);
        if(!event)
         res.status(404).send("event not found");
        res.status(200).json(event);    
    }
    catch (err) {
        res.status(500).json(err);
    }
}  
)

//book event by id and user id and decrease available seats
app.get('/bookEvent/:event/:user/:seatsTaken',cors(), async(req, res) => {
    try
    {
        const event = await Event.findById(req.params.event);
        if(!event)
         res.status(404).send("event not found");
        if(event.availableSeats<=0)
         res.status(404).send("no available seats");
        const bookedEvent = await BookedEvent.create({eventId:req.params.event,userId:req.params.user,seatsTaken:req.params.seatsTaken});
        event.availableSeats-=req.params.seatsTaken;
        await event.save();
        res.status(200).json(bookedEvent);
    }
    catch (err) {
        res.status(500).json(err);
    }
})

//cancel booking by username and event id and increase available seats
app.delete('/bookEvent/delete/:event/:user',cors(), async(req, res) => {
    try
    {
        const event = await Event.findById(req.params.event);
        if(!event)
         res.status(404).send("event not found");
        else{
        const bookedEvent = await BookedEvent.findOne({eventId:req.params.event,userId:req.params.user});
        if(!bookedEvent){
            res.status(404).send("event not found");
            res.send("event not found");
        }
        else 
        {
            if(event.availableSeats<event.seats){
                event.availableSeats+=bookedEvent.seatsTaken;
            }
        await BookedEvent.findByIdAndDelete(bookedEvent._id);
        await event.save();
        res.status(200).json(bookedEvent);
        }
    }
    }
    catch (err) {
        res.status(500).json(err);
    }
}
)







//cancel booking by id and increase available seats
app.delete('/bookEvent/:id',cors(), async(req, res) => {
    try
    {
        const bookedEvent = await BookedEvent.findByIdAndDelete(req.params.id);
        if(!bookedEvent)
         res.status(404).send("event not found");
        const event = await Event.findById(bookedEvent.event);
        event.availableSeats++;
        await event.save();
        res.status(200).json(bookedEvent);
    }
    catch (err) {
        res.status(500).json(err);
    }
}
)

//get all booked events
app.get('/bookEvent',cors(), async(req, res) => {
    try 
    {
        const bookedEvents = await BookedEvent.find({});
        res.status(200).json(bookedEvents);
    }
    catch (err) {
        res.status(500).json(err);
    }
  })
//get booked event by id
app.get('/bookEvent/:id',cors(), async(req, res) => {
    try 
    {
        const bookedEvent = await BookedEvent.findById(req.params.id);
        res.status(200).json(bookedEvent);
    }
    catch (err) {
        res.status(500).json(err);
    }
  }
)
//delete booked event by id
app.delete('/bookEvent/:id',cors(), async(req, res) => {
    try 
    {
        const bookedEvent = await BookedEvent.findByIdAndDelete(req.params.id);
        if(!bookedEvent)
         res.status(404).send("event not found");
        res.status(200).json(bookedEvent);    
    }
    catch (err) {
        res.status(500).json(err);
    }
}  
)


//get booked event by user
app.get('/bookEvent/user/:user',cors(), async(req, res) => {
    try 
    {
        const bookedEvent = await BookedEvent.find({user:req.params.user});
        res.status(200).json(bookedEvent);
    }
    catch (err) {
        res.status(500).json(err);
    }
  }
)
//get booked event by event
app.get('/bookEvent/event/:event',cors(), async(req, res) => {
    try 
    {
        const bookedEvent = await BookedEvent.find({event:req.params.event});
        res.status(200).json(bookedEvent);
    }
    catch (err) {
        res.status(500).json(err);
    }
  }
)
//get events by user that booked them
app.get('/event/user/:user',cors(), async(req, res) => {
    try 
    {
        const bookedEvents = await BookedEvent.find({userId:req.params.user});
        const events = await Event.find({_id:bookedEvents.map(x=>x.eventId)});
        res.status(200).json(events);
    }
    catch (err) {
        res.status(500).json(err);
    }
  }
)



//get all users
app.get('/user',cors(), async(req, res) => {
    try 
    {
        const users = await User.find({});
        res.status(200).json(users);
    }
    catch (err) {
        res.status(500).json(err);
    }
  })

//get user by name
app.get('/user/:name',cors(), async(req, res) => {
    try 
    {
        const user = await User.findOne({name:req.params.name});
        res.status(200).json(user);
    }
    catch (err) {
        res.status(500).json(err);
    }
  })
//add user 
app.post('/user',cors(), async(req, res) => {
    try 
    {
        const user = await User.create(req.body);
        res.status(200).json(user);
    }
    catch (err) {
        res.status(500).json(err);
    }
  })

  //delete user by id
app.delete('/user/:id',cors(), async(req, res) => {
    try 
    {
        const deletedUser = await User.findByIdAndDelete(req.params.id);
        res.status(200).json(deletedUser);    
    }
    catch (err) {
        res.status(500).json(err);
    }
}
)

//update user by id
app.put('/user/:id',cors(), async(req, res) => {
    try 
    {
        const user = await User.findByIdAndUpdate(req.params.id,req.body);
        if(!user)
         res.status(404).send("user not found");
        res.status(200).json(user);
    }
    catch (err) {
        res.status(500).json(err);
    }
}
)



//search events by name or location if it contains the search string
app.get('/event/search/:search',cors(), async(req, res) => {
    try
    {
        const events = await Event.find({$or:[{name:{$regex:req.params.search,$options:'i'}},{location:{$regex:req.params.search,$options:'i'}}]});
        res.status(200).json(events);
    }
    catch (err) {
        res.status(500).json(err);
    }
}
)

//search users by name or email or role
app.get('/user/search/:search',cors(), async(req, res) => {
    try
    {
        const users = await User.find({$or:[{name:req.params.search},{email:req.params.search},{role:req.params.search}]});
        res.status(200).json(users);
    }
    catch (err) {
        res.status(500).json(err);
    }
}
)
//search booked events by user or event
app.get('/bookEvent/search/:search',cors(), async(req, res) => {
    try
    {
        const bookedEvents = await BookedEvent.find({$or:[{user:req.params.search},{event:req.params.search}]});
        res.status(200).json(bookedEvents);
    }
    catch (err) {
        res.status(500).json(err);
    }
}
)







mongoose.set('strictQuery', false);
mongoose.connect('mongodb+srv://iheb:Am123456@cluster0.us7lr.mongodb.net/balkon?retryWrites=true&w=majority').then(() =>
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
).catch((err) => console.log(err)

);
 