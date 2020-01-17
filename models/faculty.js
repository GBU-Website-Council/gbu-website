var mongoose=require('mongoose');
var School=require('./schools.js');
var facultySchema=new mongoose.Schema({
	Sno:{
		type:Number,
		unique:true
	},
	Name:String,
	Post:String,
	Education:String,
	Description:String
	})

var Faculty=mongoose.model('faculty',facultySchema);
Faculty.create({ 
 Sno:1,
 Name:"Dr. Pradeep Tomar",
 Post:"Assitant Professor",
 Education:"Doctorate in Philosophy (Ph.D.) in Computer Science;Master of Computer Applications (M.C.A.)",
 Description:"Analysis, Design and Development of Component-Based Reusable Models and Testing Processes."},(err,faculty)=>{
	if(err)
		console.log(err);
	else
		console.log(faculty)
})

Faculty.create({ 
 Sno:2,
 Name:"Dr. Rajesh Mishra",
 Post:"Assitant Professor",
 Education:"Ph.D. & M.Tech.(IIT Kharagpur); B.E.(Electronics Engineering) SRTMU Nanded.",
 Description:"Communication Engineering; Computer Communication Network Reliability; Soft Computing; Wireless Ad Hoc Networks."},(err,faculty)=>{
	if(err)
		console.log(err);
	else
		console.log(faculty)
})
module.exports=Faculty;