var mongoose =require('mongoose');

var entitySchema=new mongoose.Schema({
title:String,
description:String,
createdAt:Date,
filename:String,
type:String,
school:String,
filetype:String
})
module.exports=mongoose.model('entity',entitySchema);