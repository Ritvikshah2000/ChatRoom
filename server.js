//requirements for ini file:
var fs = require('fs');
var ini = require('ini');

var config = ini.parse(fs.readFileSync('./config.ini', 'utf-8'))

//add installed modules using require() function:
var express = require('express');
var bodyParser = require('body-parser')
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http)
var mongoose = require('mongoose');

//to tell express that we are using a static file:
app.use(express.static(__dirname + '/public'));

//body-parser extracts the entire body portion of an incoming request stream
//exposes it on req.body
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: false}))

//message schema
var chat = mongoose.model('Chat', {
    name: String,
    message: String
});

//url of database
var dbUrl = "mongodb+srv://"+config.database.user+":"+config.database.password+"@cluster0-ioier.mongodb.net/"+config.database.database+"?retryWrites=true&w=majority"

//ROUTING:
//GET will get all the message from the database:

app.get('/messages', (req, res) => {
    chat.find({}, (err, messages) => {
        res.send(messages);
    })
})

app.get('/messages/:user', (req,res) => {
    var user = req.params.user
    chat.find({name: user}, (err, messages) => {
        res.send(messages);
    })
})

//post new messages created by the user
app.post('/messages', async (req,res) => {
    try{
        var message = new chat(req.body);

        var savedMessage = await message.save()
            console.log("Saved!");

        var censored = await chat.findOne({message:'badword'});
            if(censored)
                await chat.remove({_id: censored.id})
            else
                io.emit('message', req.body);
            res.sendStatus(200);

    }
    catch(error){
        res.sendStatus(500);
        return console.log("Error", error);
    }
    finally{
        console.log("Message Posted")
    }
})

//create a connection
io.on('Connection', () => {
    console.log('A user has Connected!', err)
})

//connect to database
mongoose.connect(dbUrl, {useNewUrlParser:true, useUnifiedTopology: true}, (err) => {
    console.log("Mongodb connected", err);
})

//start litening to a port
var server = http.listen(4000, () => {
    console.log("Server is running on port: ", server.address().port)
});













