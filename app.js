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
const Group=require('./models/groups');
const Usergroup=require('./models/usergroups');

// Routes
const signlogin=require('./routes/usersignup');
const messageroute=require('./routes/message');
const CreateGroup=require('./routes/creategroup');


app.use(signlogin);
app.use(messageroute);
app.use(CreateGroup);

// Association
User.hasMany(Message);
Message.belongsTo(User);
User.belongsToMany(Group,{through:Usergroup});
Group.belongsToMany(User,{through:Usergroup});


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
 