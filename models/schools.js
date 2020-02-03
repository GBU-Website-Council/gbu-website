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
School.create({
	abbr:"soict"
})
School.create({
	abbr:"sob"
})
School.create({
	abbr:"sobs"
})
School.create({
	abbr:"sovs"
})
School.create({
	abbr:"soh"
})
School.create({
	abbr:"soe"
})
School.create({
	abbr:"som"
})
School.create({
	abbr:"soljg"
})
module.exports=School;
