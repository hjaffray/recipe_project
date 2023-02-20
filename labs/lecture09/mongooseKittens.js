var mongoose = require('mongoose');

mongoose.connect('mongodb://web2-mongodb/test');

var db = mongoose.connection;
db.on('error'. console.error.bind(console, 'connection error:'));
db.once('open', function(){

    //we're connected?!
});

//schema stuff
var kittySchema = mongoose.Schema({

    name: String
});

//model
var Kitten = mongoose.model('Kitten', kittySchema);

//kitten document
var silence = new Kitten({name: 'Silence'});

console.log(silence.name); //silence

//Meow Function
kittySchema.methods.speak = function(){
    var greeting = this.name? "Meow name is " + this.name : "I don't have a name";
    console.log(greeting);
}

var Kitten = mongoose.model('Kitten', kittySchema);

var fluffy = new Kitten({name:'fluffy'});
fluffy.speak(); //"meow name is fluffy"

//saving with error handling
fluffy.save(function (err, fluffy){
    if(err) return console.error(err);
    fluffy.speak();
})

//accessing docs through kitten model
Kitten.find(function (err, kittens){
    if(err) return console.error(err);
        console.log(kittens);
})

//querying example - for all kittens with a name that begins with "fluff"
Kitten.find({name: /^fluff/}, callback);


/*connection copy/paste
heroku config:set MONGODB_URI='mongodb+srv://hjaffray:password1459@cluster0.lsuo8xw.mongodb.net/?retryWrites=true&w=majority'

*/