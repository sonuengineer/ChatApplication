let express = require("express");
let bodyParser = require("body-parser");
let bcrypt = require("bcrypt");
let cors = require("cors");



let app = express();
app.use(bodyParser.json());
app.use(cors());




//Database
const sequelize = require("./models/database");



// Models
const User=require('./models/user');
const Message=require('./models/messages');


// Routes
const signlogin=require('./routes/usersignup');
const messageroute=require('./routes/message');



app.use(signlogin);
app.use(messageroute);


// Association
User.hasMany(Message);
Message.belongsTo(User);



sequelize
  .sync()
  .then((result) => {
    app.listen(5555, () => {
      console.log(" listening to 5555 port ");
    });
  })
  .catch((err) => {
    console.log(err);
  });
 