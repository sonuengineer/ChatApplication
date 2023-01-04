const express = require("express");
const router = express.Router();
let bodyParser = require("body-parser");
let aut=require('../authentication');
router.use(bodyParser.json());


const groupadminmess = require('../controllers/groupmsgs')

router.post('/postgroupmsgs/:id',aut.authenticate,groupadminmess.postgroupmess)
router.get('/getgrpmsgs/:id',aut.authenticate,groupadminmess.getgrpmessag)
router.post("/removepart/:id", aut.authenticate,groupadminmess.removeparts)
router.post("/makeuseradmin/:id", aut.authenticate,groupadminmess.makeuseradminn)
  

module.exports=router;