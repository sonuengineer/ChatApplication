const Group=require('../models/groups');
const User=require('../models/user');
const uuid=require('uuid');
const aut=require('../authentication');
const Usergroup=require('../models/usergroups');
const express=require('express');
const router=express.Router();

const groupCont = require('../controllers/creategroup')



router.get('/getgrpname/:id',aut.authenticate,groupCont.getgrpna )
router.post('/creategrp',aut.authenticate,groupCont.creatgrp)
router.get('/getallgroups',aut.authenticate,groupCont.getallgroups )
router.post('/addparticipants/:id',aut.authenticate,groupCont.addparticipants) 
router.get('/grpparticipants/:id',aut.authenticate,groupCont.grpparticipants)



module.exports=router;