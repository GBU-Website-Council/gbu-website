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
// School.create({
// 	abbr:"soict",
// 	name:"ICT"
// })
// School.create({
// 	abbr:"sob",
// 	name:"Biotech"
// })
// School.create({
// 	abbr:"sobs",
// 	name:"Buddhism"
// })
// School.create({
// 	abbr:"sovs",
// 	name:"Vocational"
// })
// School.create({
// 	abbr:"soh",
// 	name:"Humanities"
// })
// School.create({
// 	abbr:"soe",
// 	name:"Engineering"
// })
// School.create({
// 	abbr:"som",
// 	name:"Management"
// })
// School.create({
// 	abbr:"soljg",
// 	name:"Law"
// })
module.exports=School;
