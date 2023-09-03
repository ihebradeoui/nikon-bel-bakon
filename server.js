const express = require('express')
const mongoose = require('mongoose')
const Event = require('./models/eventModel');
const BookedEvent = require('./models/bookedEventModel');
const User = require('./models/userModel');
const app = express()
const port = 3000



app.use(express.json());
//routes 

app.get('/', (req, res) => {
  res.send('Hello Worldss!')
})
app.get('/blog', (req, res) => {
    res.send('Hello blog!')
  })
  
app.post('/event', async(req, res) => {
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
app.get('/event', async(req, res) => {
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
app.get('/event/:id', async(req, res) => {
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
app.put('/event/:id', async(req, res) => {
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
app.delete('/event/:id', async(req, res) => {
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

//book event
app.post('/bookEvent', async(req, res) => {
    try 
    {
        const bookedEvent = await BookedEvent.create(req.body);
        res.status(200).json(bookedEvent);
    }
    catch (err) {
        res.status(500).json(err);
    }
  })

//get all booked events
app.get('/bookEvent', async(req, res) => {
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
app.get('/bookEvent/:id', async(req, res) => {
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
app.delete('/bookEvent/:id', async(req, res) => {
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
app.get('/bookEvent/user/:user', async(req, res) => {
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
app.get('/bookEvent/event/:event', async(req, res) => {
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
app.get('/event/user/:user', async(req, res) => {
    try 
    {
        const bookedEvents = await BookedEvent.find({user:req.params.user});
        const events = await Event.find({_id:bookedEvents.map(x=>x.eventId)});
        res.status(200).json(events);
    }
    catch (err) {
        res.status(500).json(err);
    }
  }
)



//get all users
app.get('/user', async(req, res) => {
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
app.get('/user/:name', async(req, res) => {
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
app.post('/user', async(req, res) => {
    try 
    {
        const user = await User.create(req.body);
        res.status(200).json(user);
    }
    catch (err) {
        res.status(500).json(err);
    }
  })

  //delete user by name
app.delete('/user/:name', async(req, res) => {
    try 
    {
        const user = await User.find({name:req.params.name});
        if(!user)
         res.status(404).send("user not found");
        const deletedUser = await User.findByIdAndDelete(user._id);
        res.status(200).json(deletedUser);    

    }
    catch (err) {
        res.status(500).json(err);
    }
}
)

//update user by id
app.put('/user/:id', async(req, res) => {
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





mongoose.set('strictQuery', false);
mongoose.connect('mongodb+srv://iheb:Am123456@cluster0.us7lr.mongodb.net/balkon?retryWrites=true&w=majority').then(() =>
app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
  })
).catch((err) => console.log(err)

);