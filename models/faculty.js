var mongoose=require('mongoose');
var School=require('./schools.js');
var facultySchema=new mongoose.Schema({
	Sno:{
		type:Number,
		unique:true
	},
	School:String,
	Name:String,
	Post:String,
	Education:String,
	Description:String
	})

var Faculty=mongoose.model('faculty',facultySchema);
// Faculty.create({ 
//  Sno:1,
//  School:"SOICT",
//  Name:"Dr. Pradeep Tomar",
//  Post:"Assitant Professor",
//  Education:"Doctorate in Philosophy (Ph.D.) in Computer Science;Master of Computer Applications (M.C.A.)",
//  Description:"Analysis, Design and Development of Component-Based Reusable Models and Testing Processes."},(err,faculty)=>{
// 	if(err)
// 		console.log(err);
// 	else
// 		console.log(faculty)
// })
// Faculty.create({ 
//  Sno:2,
//  School:"SOICT",
//  Name:"Dr. Rajesh Mishra",
//  Post:"Assitant Professor",
//  Education:"Ph.D. & M.Tech.(IIT Kharagpur); B.E.(Electronics Engineering) SRTMU Nanded.",
//  Description:"Communication Engineering; Computer Communication Network Reliability; Soft Computing; Wireless Ad Hoc Networks."},(err,faculty)=>{
// 	if(err)
// 		console.log(err);
// 	else
// 		console.log(faculty)
// })
// Faculty.create({ 
//  Sno:3,
//  School:"SOM",
//  Name:"Prof. Shweta Anand",
//  Post:"Professor and Dean",
//  Education:"PhD (Wealth Management), MCom, PGDM (Finance), ICWA, Net Qualified and multiple NCFM certifications",
//  Description:"Financial Services,Derivatives, Wealth"},(err,faculty)=>{
// 	if(err)
// 		console.log(err);
// 	else
// 		console.log(faculty)
// })
// Faculty.create({ 
//  Sno:4,
//  School:"SOB",
//  Name:"Dr. Vikrant Nain",
//  Post:"Assitant Professor",
//  Education:"Genetic Engineering, Molecular biology and plant Biotechnology",
//  Description:""},(err,faculty)=>{
// 	if(err)
// 		console.log(err);
// 	else
// 		console.log(faculty)
// })
// Faculty.create({ 
//  Sno:5,
//  School:"SOVS",
//  Name:"Dr. Amit Kumar Awasthi",
//  Post:"Assitant Professor",
//  Education:"Ph.D. Mathematics(Dr BR Ambedkar University);M. Sc., MJP Rohilkhand University, 1999.",
//  Description:"Ordinary & Partial Differential Equations, Numerical Methods, Engineering Mathematics, Complex Analysis, Cryptology."},(err,faculty)=>{
// 	if(err)
// 		console.log(err);
// 	else
// 		console.log(faculty)
// })
module.exports=Faculty;