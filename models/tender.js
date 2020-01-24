var mongoose =require('mongoose');

var tenderSchema=new mongoose.Schema({
title:String,
file:String,
createdAt:Date,
})
module.exports=mongoose.model('tender',tenderSchema);