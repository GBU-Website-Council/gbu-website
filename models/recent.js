var mongoose =require('mongoose');

var recentSchema=new mongoose.Schema({
title:String,
description:String,
createdAt:Date,
pdf:Array
})
module.exports=mongoose.model('recent',recentSchema);