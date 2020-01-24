var mongoose =require('mongoose');

var EtenderSchema=new mongoose.Schema({
title:String,
file:String,
createdAt:Date,
})
module.exports=mongoose.model('Etender',EtenderSchema);