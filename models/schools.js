var mongoose =require('mongoose')
var schoolSchema=new mongoose.Schema({
	abbr:{
		type:String,
		unique:true
	},
	name:{
		type:String,
		unique:true
	},
	// description:String,
	entities:[{
		type:mongoose.Schema.Types.ObjectId,
		ref:"entity"
	}]
})
var School=mongoose.model('School',schoolSchema);
module.exports=School;