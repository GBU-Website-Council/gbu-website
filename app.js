const express=require('express'),
      app=express();
const mongoose=require('mongoose');
// const crypto=require('crypto');
const path=require('path');
const bodyParser=require('body-parser');
const multer=require('multer');
const Grid=require('gridfs-stream');
const mongoLocalURI="mongodb://localhost/gbu_website";
const GridFsStorage=require('multer-gridfs-storage');
mongoose.connect(process.env.DATABASEURL||mongoLocalURI,{useNewUrlParser: true});
const conn=mongoose.createConnection(process.env.DATABASEURL||mongoLocalURI);
const School=require('./models/schools.js');
const Entity=require('./models/entity.js');
const Faculty=require('./models/faculty.js');
app.use(express.static(__dirname+'/public'));
app.use(bodyParser.urlencoded({extended:true}));
app.set('view engine','ejs');

var gfs;
conn.once('open',()=>{
	gfs=Grid(conn.db,mongoose.mongo);
	gfs.collection('uploads')
});
  // file: (req, file) => {
  //   return new Promise((resolve, reject) => {
  //     crypto.randomBytes(16, (err, buf) => {
  //       if (err) {
  //         return reject(err);
  //       }
  //       const filename = buf.toString('hex') + path.extname(file.originalname);
  //       const fileInfo = {
  //         filename: filename,
  //         bucketName: 'uploads'
  //       };
  //       resolve(fileInfo);
  //     });
  //   });
  // }
  const storage = new GridFsStorage({
  url: process.env.DATABASEURL||mongoLocalURI,
  file: (req, file) => {
    return new Promise((resolve, reject) => {
        const filename = file.originalname;
        const fileInfo = {
          filename: filename,
          bucketName: 'uploads'
        };
        resolve(fileInfo);
    });
  }
});
const upload = multer({ storage });
app.get('/',function(req,res){
	Entity.find({}).sort({createdAt:-1}).exec(function(err,entities){
        if(err){
        	console.log(err);
        }
		else{
			res.render('index.ejs',{entities})
		}
	});
});
// app.get('/image/:filename', (req, res) => {
//   gfs.files.findOne({ filename: req.params.filename }, (err, file) => {
//     // Check if file
//     if (!file || file.length === 0) {
//       return res.status(404).json({
//         err: 'No file exists'
//       });
//     }
//     // File exists
//     `if(file.contentType=='image/jpg'||file.contentType=='image/png'||file.contentType=='image/jpeg')`
//     {
//     // streaming from gridfs
//     var readstream = gfs.createReadStream({
//       filename: req.params.filename
//     });
//     //error handling, e.g. file does not exist
//     readstream.on('error', function (err) {
//       console.log('An error occurred!', err);
//       throw err;
//     });
//     readstream.pipe(res);
// }
// else
// 	res.render('404')
//   });
// });
// app.post('/ivy99_gbu_adminPage/photos',upload.single('file'),function(req,res){
//      res.redirect('/');
// });
app.get('/files/:type/:filename', (req, res) => {
	if(req.params.type=='news'||req.params.type=='events'||req.params.type=='notices'){
  gfs.files.findOne({filename: req.params.filename }, (err, file) => {
    // Check if file
    if (!file || file.length === 0) {
      return res.status(404).json({
        err: 'No file exists'
      });
    }
    // File exists
    const readstream = gfs.createReadStream(file.filename);
    return readstream.pipe(res);
  });
}
else
	res.render('404');
});


// app.get('/events/:id',function(req,res){
//     Entity.findById(req.params.id,function(err,entity){
//           res.render('entity.ejs',{entity})
//     });
// });
app.get('/ivy99_gbu_adminPage',function(req,res){
res.render('admin');
});
app.get('/ivy99_gbu_adminPage/:name',function(req,res){
	var name=req.params.name;
	// if(name=="photos")
	// 	res.render('edit_admin_photos');
	// else if(name='faculty')
	// 	res.render('edit_admin_faculty');
	if (name=='news' || name=='events' || name=='notices')
         res.render('edit_admin',{name});
    else 
    	res.render("404")
});
app.post('/ivy99_gbu_adminPage/:name',upload.single('file'),function(req,res){
	console.log(req.body)
	if(req.body.school=="all"){
       School.find({},function(err,schools){
       	if(err)
       		res.redirect('back');
       	else
       	{
       		Entity.create({
		title:req.body.title,
	createdAt:req.body.date,
	filename:req.file.filename,
	description:req.body.description,
	type:req.params.name,
	school:'all',
	filetype:req.file.contentType
	},function(err,entity){
		if(err){
			res.redirect('back')
		}
		else{
			schools.forEach(function(school){
               school.entities.push(entity._id);
               school.save();
       		})
			res.redirect('/');
		}
	});
       	}
       })
	}
	else{
School.findOne({abbr:req.body.school},function(err,foundSchool){
if(err){
	res.redirect('back');
}
else{
	Entity.create({
		title:req.body.title,
	createdAt:req.body.date,
	filename:req.file.filename,
	description:req.body.description,
	type:req.params.name,
	school:foundSchool.abbr,
	filetype:req.file.contentType
	},function(err,entities){
		if(err){
			res.redirect('back')
		}
		else{
			foundSchool.entities.push(entities._id);
			foundSchool.save();
			res.redirect('/');
		}
	});
}
})
}
});
app.get('/clubs',(req,res)=>{
	res.render('clubs');
})
app.get('/clubs/dance',(req,res)=>{
	res.render('dance')
})
app.get('/clubs/nature',(req,res)=>{
	res.render('nature')
})
app.get('/about/home',function(req,res){
	res.render('home')
})
app.get('/about/vision-&-mission',function(req,res){
res.render('vision')
});
app.get('/about/vc-message',function(req,res){
res.render('vc')
});
app.get('/about/governing-bodies',function(req,res){
res.render('bodies')
});
app.get('/about/organisation',function(req,res){
res.render('organisation')
});
app.get('/about/gbu-commitee',function(req,res){
res.render('commitee')
});
app.get('/about/annual-report',function(req,res){
res.render('report')
});
app.get('/about/forums-and-associations',function(req,res){
res.render('forums')
});
app.get('/about/gbu-act',function(req,res){
res.render('act')
});
 app.get('/about/right-to-information',function(req,res){
res.render('rti')
});
app.get('/academics/academic-programmes',function(req,res){
	res.render('programmes')
});
app.get('/academics/international-collaboration',function(req,res){
	res.render('collaboration')
});
app.get('/academics/international-student-affairs',function(req,res){
	res.render('affairs')
});
app.get('/academics/training-consultations',function(req,res){
	res.render('training')
});
app.get('/academics/hostel-allotment',function(req,res){
	res.render('hostel')
});
app.get('/academics/students-placements',function(req,res){
	res.render('students_placements')
});
app.get('/academics/research-publication',function(req,res){
	res.render('research_publication')
});
app.get('/academics/ieee-gbu-student-branch',function(req,res){
	res.render('ieee')
});
app.get('/academics/national-service-scheme',function(req,res){
	res.render('national')
});
app.get('/academics/anti-ragging',function(req,res){
	res.render('ragging')
});
app.get('/academics/nirf-report',function(req,res){
	res.render('nirf')
});
app.get('/academics/student-satisfaction-survey',function(req,res){
	res.render('survey')
});
app.get('/academics/national-academic-depository',function(req,res){
	res.render('depository')
});
app.get('/campus-life',function(req,res){
	res.render('campus')
})
app.get('/students',function(req,res){
	res.render('student')
});
app.get('/alumni',function(req,res){
	res.render('alumni')
})
app.get('/admissions',(req,res)=>{
	res.render('admissions')
})
app.get('/library/home',(req,res)=>{
	res.render('library_home')
})
app.get('/library/about',(req,res)=>{
	res.render('library_about')
})
app.get('/library/online-catalogue',(req,res)=>{
	res.render('library_online')
})
app.get('/library/e-resources',(req,res)=>{
	res.render('library_resources')
})
app.get('/library/downloads-&-forums',(req,res)=>{
	res.render('library_downloads')
})
app.get('/library/contact-us',(req,res)=>{
	res.render('library_contact')
})
app.get('/tender',(req,res)=>{
	res.render('tender');
})
app.get('/city-life',(req,res)=>{
	res.render('city');
});
app.get('/results',(req,res)=>{
	res.render('results');
})
app.get('/iprcell/home',(req,res)=>{
 	res.render('iprcell_home')
});
app.get('/iprcell/contact-us',(req,res)=>{
 	res.render('iprcell_contact')
});
app.get('/iprcell/courses',(req,res)=>{
 	res.render('iprcell_courses')
});
app.get('/iprcell/people',(req,res)=>{
 	res.render('iprcell_people')
});
app.get('/iprcell/links',(req,res)=>{
 	res.render('iprcell_links')
});
app.get('/iprcell/policy',(req,res)=>{
 	res.render('iprcell_policy')
});
app.get('/iprcell/iprs',(req,res)=>{
 	res.render('iprs')
});
app.get('/ccc',(req,res)=>{
	res.render('ccc');
})
app.get('/crc',(req,res)=>{
	res.render('crc');
})

app.get('/e-tender',(req,res)=>{
	res.render('etender');
})
app.get('/faqs',(req,res)=>{
	res.render('faqs')
})
app.get('/schools/soict',(req,res)=>{
	Entity.find({}).sort({createdAt:-1}).exec(function(err,entities){
	  entities=	entities.filter((entity)=>entity.school=='all'||entity.school=='soict')
	res.render('soict',{entities})
	});
});
app.get('/schools/sob',(req,res)=>{
	Entity.find({}).sort({createdAt:-1}).exec(function(err,entities){
	entities=entities.filter((entity)=>entity.school=='all'||entity.school=='sob')
	res.render('sob',{entities})
	});
});
app.get('/schools/sobs',(req,res)=>{
	Entity.find({}).sort({createdAt:-1}).exec(function(err,entities){
	entities=entities.filter((entity)=>entity.school=='all'||entity.school=='sobs')
	res.render('sobs',{entities})
	});
});
app.get('/schools/som',(req,res)=>{
	Entity.find({}).sort({createdAt:-1}).exec(function(err,entities){
	entities=entities.filter((entity)=>entity.school=='all'||entity.school=='som')
	res.render('som',{entities})
	});
});
app.get('/schools/sovs',(req,res)=>{
	Entity.find({}).sort({createdAt:-1}).exec(function(err,entities){
	entities=entities.filter((entity)=>entity.school=='all'||entity.school=='sovs')
	res.render('sovs',{entities})
	});
});
app.get('/schools/soh',(req,res)=>{
	Entity.find({}).sort({createdAt:-1}).exec(function(err,entities){
	entities=entities.filter((entity)=>entity.school=='all'||entity.school=='soh')
	res.render('soh',{entities})
	});
});
app.get('/schools/soe',(req,res)=>{
	Entity.find({}).sort({createdAt:-1}).exec(function(err,entities){
	entities=entities.filter((entity)=>entity.school=='all'||entity.school=='soe')
	res.render('soe',{entities})
	});
});
app.get('/schools/soljg',(req,res)=>{
	Entity.find({}).sort({createdAt:-1}).exec(function(err,entities){
	entities=entities.filter((entity)=>entity.school=='all'||entity.school=='soljg')
	res.render('soljg',{entities})
	});
});
// app.get('/schools/:name',function(req,res){
// 	School.findOne({abbr:req.params.name}).populate({path:'entities',options:{ sort: { 'createdAt': -1 }}}).exec(function(err,school){
// 		if(err) 
// 	res.redirect('back');
//     else if(!school)
//     	res.render('404');
// 		else{
// 			console.log(school);
// 			res.render('school',{school})
// 		}
// 	})
// });
// app.get('/schools/:name/about-us/overview',function(req,res){
// School.findOne({abbr:req.params.name},function(err,school){
// 		if(err) 
// 	res.redirect('back');
//     else if(!school)
//     	res.render('404');
// 		else{
// 			res.render('overview',{school})
// 		}
// })
// });
// app.get('/schools/:name/about-us/departments',function(req,res){
// School.findOne({abbr:req.params.name},function(err,school){
// 		if(err) 
// 	res.redirect('back');
//     else if(!school)
//     	res.render('404');
// 		else{
// 			res.render('departments',{school})
// 		}
// })
// });
// app.get('/schools/:name/about-us/programs',function(req,res){
// School.findOne({abbr:req.params.name},function(err,school){
// 		if(err) 
// 	res.redirect('back');
//     else if(!school)
//     	res.render('404');
// 		else{
// 			res.render('programs',{school})
// 		}
// })
// });
// app.get('/schools/:name/about-us/board-of-studies',function(req,res){
// School.findOne({abbr:req.params.name}).populate('faculties').exec(function(err,school){
//     if(err) 
// 	res.redirect('back');
//     else if(!school)
//     	res.render('404');
// 		else{
// 			res.render('board',{school})
// 		}
// })
// });
// app.get('/schools/:name/about-us/contact-us',function(req,res){
// School.findOne({abbr:req.params.name},function(err,school){
// 		if(err) 
// 	res.redirect('back');
//     else if(!school)
//     	res.render('404');
// 		else{
// 			res.render('contact',{school})
// 		}
// })
// });
// app.get('/schools/:name/placements',function(req,res){
// School.findOne({abbr:req.params.name},function(err,school){
// 		if(err) 
// 	res.redirect('back');
//     else if(!school)
//     	res.render('404');
// 		else{
// 			res.render('placements',{school})
// 		}
// })
// });
// app.get('/schools/:name/faculty',function(req,res){
// School.findOne({abbr:req.params.name}).populate('faculties').exec(function(err,school){
//     if(err) 
// 	res.redirect('back');
//     else if(!school)
//     	res.render('404');
// 		else{
// 			res.render('faculty',{school})
// 		}
// })
// });

app.get('/:type/:id',function(req,res){
    Entity.findOne({$and: [{_id:req.params.id},{type:req.params.type}]},function(err,entity){
    	// console.log(entity)
    	if(err||!entity)
    		res.render('404');
    	
    	else
          res.render('entity',{entity})
    });
});
app.get('/schools/:name/:type/:id',function(req,res){
	if(req.params.name=='soict'||req.params.name=='sob'||req.params.name=='som'||req.params.name=='soh'||req.params.name=='sobs'||req.params.name=='sovs'||req.params.name=='soljg'||req.params.name=='soe'){
			Entity.findOne({$and:[{type:req.params.type},{_id:req.params.id}]},function(err,entity){
				if(!err&&entity){
					res.render('entity.ejs',{entity})
				}
				else
					res.render('404')
			})
		}
		else
			res.render('404')
		});
app.get('/placements',(req,res)=>{
	res.render('placements')
})
app.get('/recruitment',(req,res)=>{
	res.render('recruitment')
})
app.get('/naac',(req,res)=>{
	res.render('naac');
})
app.get('/gallery',(req,res)=>{
	res.render('gallery')
})
app.get('/media',(req,res)=>{
	res.render('media')
})
app.get('/contact',(req,res)=>{
	res.render('contact')
})
app.get('/leave-form',(req,res)=>{
	res.render('leave')
})
app.get('/payment',(req,res)=>{
	res.render('payment')
})
app.get('/*',function(req,res){
res.render('404');
});
app.listen(process.env.PORT||'3000',process.env.IP,function(){
console.log('Server is listening!')
});