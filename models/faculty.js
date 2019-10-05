var mongoose=require('mongoose');
var School=require('./schools.js');
var facultySchema=new mongoose.Schema({
	title:String,
	name:{
		type:String,
		unique:true
	},
	designation:String,
	board_member:{
		default:'none',
		type:String
	},
	post:{
		default:'Faculty',
		type:String
	},
	school:String,
	university:{
		default:'Gautam Buddha University',
		type:String
	}
})

var Faculty=mongoose.model('faculty',facultySchema);

// Faculty.create({
// 	title:'Prof.',
// 	name:'Shewta Anand',
// 	designation:'Professor and Dean',
// 	post:'dean',
// 	board_member:'internal',
// 	school:'sob'
// },function(err,faculty){
// 	if(faculty)
// {
// 	School.findOne({abbr:faculty.school},function(err,school){
// 		console.log(school);
//          school.faculties.push(faculty._id);
//          school.save();
// 	});
// }
// });
// Faculty.create({
// 	title:'Dr.',
// 	name:'Shakti Sahi',
// 	post:'HoD',
// 	designation:'Assistant Professor',
// 	board_member:'internal',
// 	school:'sob',
// },function(err,faculty){
// 	if(faculty)
// 		{
// 	School.findOne({abbr:faculty.school},function(err,school){
// 		console.log(school);
//          school.faculties.push(faculty._id);
//          school.save();
// 	});
// }
// });
// Faculty.create({
// 	title:'Dr.',
// 	name:'Rekha Puria',
// 	designation:'Assistant Professor',
// 	board_member:'internal',
// 	school:'sob'
// },function(err,faculty){
// 	if(faculty)
// 		{
// 	School.findOne({abbr:faculty.school},function(err,school){
// 		console.log(school);
//          school.faculties.push(faculty._id);
//          school.save();
// 	});
// }
// });
// Faculty.create({
// 	title:'Prof.',
// 	name:'K.J. Mukherjee',
// 	designation:'Professor',
// 	board_member:'external',
// 	school:'sob',
// 	university:'Jawaharlal Nehru University, New Delhi'
// },function(err,faculty){
// 	if(faculty)
// 		{
// 	School.findOne({abbr:faculty.school},function(err,school){
// 		console.log(school);
//          school.faculties.push(faculty._id);
//          school.save();
// 	});
// }
// });
// Faculty.create({
// 	title:'Prof.',
// 	name:'P.C. Sharma',
// 	designation:'Professor',
// 	board_member:'external',
// 	school:'sob',
// 	university:'GGSIP University Dwarka, Delhi'
// },function(err,faculty){
// 	if(faculty)
// 	{
// 	School.findOne({abbr:faculty.school},function(err,school){
// 		console.log(school);
//          school.faculties.push(faculty._id);
//          school.save();
// 	});
// }
// })
// Faculty.create({
// 	title:'Dr.',
// 	name:'Indu Uprety',
// 	designation:'Assistant Professor',
// 	board_member:'internal',
// 	post:'dean',
// 	school:'soict'
// },function(err,faculty){
// 	if(faculty)
// 		{
// 	School.findOne({abbr:faculty.school},function(err,school){
// 		console.log(school);
//          school.faculties.push(faculty._id);
//          school.save();
// 	});
// }
// });
// Faculty.create({
// 	title:'Dr.',
// 	name:'Rajesh Mishra',
// 	designation:'Assistant Professor',
// 	board_member:'internal',
// 	school:'soict',
// 	post:'HoD (ECE)'
// },function(err,faculty){
// 	if(faculty)
// 		{
// 	School.findOne({abbr:faculty.school},function(err,school){
// 		console.log(school);
//          school.faculties.push(faculty._id);
//          school.save();
// 	});
// }
// });
// Faculty.create({
// 	title:'Dr.',
// 	name:'Vidushi Sharma',
// 	designation:'Assistant Professor',
// 	board_member:'internal',
// 	school:'soict'
// },function(err,faculty){
// 	if(faculty)
// 		{
// 	School.findOne({abbr:faculty.school},function(err,school){
// 		console.log(school);
//          school.faculties.push(faculty._id);
//          school.save();
// 	});
// }
// });
// Faculty.create({
// 	title:'Dr.',
// 	name:'Anurag Singh Bhagel',
// 	designation:'Assistant Professor',
// 	board_member:'internal',
// 	school:'soict',
// 	post:'HoD (CSE)'
// },function(err,faculty){
// 	if(faculty)
// 		{
// 	School.findOne({abbr:faculty.school},function(err,school){
// 		console.log(school);
//          school.faculties.push(faculty._id);
//          school.save();
// 	});
// }
// });
// Faculty.create({
// 	title:'Dr.',
// 	name:'Neeta Singh',
// 	designation:'Assistant Professor',
// 	board_member:'internal',
// 	school:'soict'
// },function(err,faculty){
// 	if(faculty)
// 		{
// 	School.findOne({abbr:faculty.school},function(err,school){
// 		console.log(school);
//          school.faculties.push(faculty._id);
//          school.save();
// 	});
// }
// });
module.exports=Faculty;