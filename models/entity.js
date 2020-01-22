var mongoose =require('mongoose');

var entitySchema=new mongoose.Schema({
title:String,
description:String,
createdAt:Date,
photo:String,
type:String,
school:String,
pdf:String
})
module.exports=mongoose.model('entity',entitySchema);