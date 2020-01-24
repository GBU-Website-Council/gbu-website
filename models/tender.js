var mongoose =require('mongoose');

var tenderSchema=new mongoose.Schema({
title:String,
file:Array,
createdAt:Date,
})
module.exports=mongoose.model('tender',tenderSchema);