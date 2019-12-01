var express       = require('express'),
    mongoose      = require('mongoose'),
    bodyParser    = require('body-parser');



var app = express();
var recepisRoutes =require('./routes/recepis');

mongoose.connect("mongodb+srv://mico:mico@cluster0-vrvsq.mongodb.net/test?retryWrites=true&w=majority");
// mongoose.connect('mongodb://127.0.0.1:27017/dbrecipes', {useNewUrlParser:true});
app.use(bodyParser.urlencoded({extended:true}));
app.use(express.static('public'));
app.set('view engine', 'ejs');

app.use(recepisRoutes);
// app.listen(27017, function(){
//   console.log("Server started")
// })
app.listen(process.env.PORT,process.env.IP,function(){
  console.log("Started Server");
});
