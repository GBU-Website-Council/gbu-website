var mongoose=require('mongoose');
var School=require('./schools.js');
var facultySchema=new mongoose.Schema({
	id:{
		type:Number,
		unique:true
	},
	username:String,
	name:String,
	position:String,
	school:String,
	qualification:String,
	field_of_teaching:String,
	image:String,
	updates:String,
	biography:String,
	academics:String,
	current_course:String,
	planned_course:String,
	past_course:String,
	research:String,
	books:String,
	patents:String,
	journals:String,
	conference_proceeding:String,
	phd_students:String,
	m_b_tech_students:String,
	graduated_students:String,
	research_assistants:String,
	summer_interns:String,
	independent_studies:String,
	contact_information:String,
	contact_phone_number:String,
	contact_email:String,
	correspondence_address:String,
	correspondence_phone_number:String,
	correspondence_email:String,
	})

var Faculty=mongoose.model('faculty',facultySchema);
module.exports=Faculty;	