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
const Tender=require('./models/tender.js');
const ETender=require('./models/e-tender.js');
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
	Entity.find({school:"main"}).sort({createdAt:-1}).exec(function(err,entities){
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
app.get('/files/tenders/:filename', (req, res) => {
  gfs.files.findOne({filename: req.params.filename}, (err, file) => {
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
});

app.get('/files/:type/:filename', (req, res) => {
	if(req.params.type=='news'||req.params.type=='events'||req.params.type=='notices'||req.params.type=='workshops'||req.params.type=='conferences'||req.params.type=='activities'){
  gfs.files.findOne({filename: req.params.filename}, (err, file) => {
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
app.get('/gbu_ivy_99',function(req,res){
res.render('login');
});
app.post('/gbu_ivy_99',function(req,res){
	console.log(process.env.password)
	if(req.body.username=="gbu@admin"&&req.body.password=="gbu@admin#p@ssw0rd"){
		res.render("admin");
	}
	else
		res.redirect("back")
})

app.get('/gbu_ivy_99/e-tender',function(req,res){
	res.render('edit_e_tender');
})
app.get('/gbu_ivy_99/tender',function(req,res){
	res.render('edit_tender');
})
app.get('/gbu_ivy_99/:name',function(req,res){
	var name=req.params.name;
	// if(name=="photos")
	// 	res.render('edit_admin_photos');
	// else if(name='faculty')
	// 	res.render('edit_admin_faculty');
	if (name=='news' || name=='events' || name=='notices'||name=='workshops'||name=='conferences'||name=='activities')
         res.render('edit_admin',{name});
    else 
    	res.render("404")
});
app.post('/gbu_ivy_99/tender',upload.single('file'),function(req,res){
	Tender.create({
		title:req.body.title,
		createdAt:req.body.date,
		file:req.file.filename
	},function(err,tender){
		if(err)
			res.redirect('back')
		else
			res.redirect('/')
	})
})
app.post('/gbu_ivy_99/e-tender',upload.single('file'),function(req,res){
	ETender.create({
		title:req.body.title,
		createdAt:req.body.date,
		file:req.file.filename
	},function(err,etender){
		if(err)
			res.redirect('back')
		else
			res.redirect('/')
	})
})
app.post('/gbu_ivy_99/:name',upload.fields([{
           name: 'photo', maxCount: 1
         }, {
           name: 'pdf', maxCount: 20
         }]),function(req,res){
	if(req.body.school=="all"){
       School.find({},function(err,schools){
       	if(err)
       		res.redirect('back');
       	else
       	{

       		Entity.create({
		title:req.body.title,
	createdAt:req.body.date,
	photo:req.files['photo'][0].filename,
	description:req.body.description,
	school:"main",
	type:req.params.name,
	pdf:req.files['pdf']
	},function(err,entity){
		if(err){
			console.log(err)
			res.redirect('back')
		}
		else{
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
	photo:req.files['photo'][0].filename,
	description:req.body.description,
	type:req.params.name,
	school:foundSchool.abbr,
	pdf:req.files['pdf']
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
app.get('/clubs/website-council',(req,res)=>{
	res.render('club_website')
})
app.get('/clubs/drama',(req,res)=>{
	res.render('club_drama')
})
app.get('/clubs/dance',(req,res)=>{
	res.render('club_dance')
})
app.get('/clubs/dhristikon',(req,res)=>{
	res.render('club_dhristikon')
})
app.get('/clubs/literary',(req,res)=>{
	res.render('club_literary')
})
app.get('/clubs/techno',(req,res)=>{
	res.render('club_techno')
})
app.get('/clubs/art-painting',(req,res)=>{
	res.render('club_art')
})
app.get('/clubs/creativity',(req,res)=>{
	res.render('club_creativity')
})
app.get('/clubs/photography',(req,res)=>{
	res.render('club_photography')
})
app.get('/clubs/music',(req,res)=>{
	res.render('club_music')
})
app.get('/clubs/adventure',(req,res)=>{
	res.render('club_adventure')
})
app.get('/clubs/social-service',(req,res)=>{
	res.render('club_social')
})
app.get('/clubs/audio-visual-education',(req,res)=>{
	res.render('club_audio')
})
app.get('/clubs/bodhi-mindfulness',(req,res)=>{
	res.render('club_bodhi')
})
app.get('/clubs/nature',(req,res)=>{
	res.render('club_nature')
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
app.get('/about/regulatory-bodies',function(req,res){
res.render('regulatory-bodies')
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
	res.render('academics_programmes')
});
app.get('/academics/international-collaboration',function(req,res){
	res.render('academics_collaboration')
});
app.get('/academics/international-student-affairs',function(req,res){
	res.render('academics_affairs')
});
app.get('/academics/training-consultations',function(req,res){
	res.render('academics_training')
});
app.get('/academics/hostel-allotment',function(req,res){
	res.render('academics_hostel')
});
app.get('/academics/students-placements',function(req,res){
	res.render('academics_students_placements')
});
app.get('/academics/research-publication',function(req,res){
	res.render('academics_research_publication')
});
app.get('/academics/ieee-gbu-student-branch',function(req,res){
	res.render('academics_ieee')
});
app.get('/academics/national-service-scheme',function(req,res){
	res.render('academics_national')
});
app.get('/academics/anti-ragging',function(req,res){
	res.render('academics_ragging')
});
app.get('/academics/nirf-report',function(req,res){
	res.render('academics_nirf')
});
app.get('/academics/student-satisfaction-survey',function(req,res){
	res.render('academics_survey')
});
app.get('/academics/national-academic-depository',function(req,res){
	res.render('academics_depository')
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
app.get('/cultural-council',(req,res)=>{
	res.render('cultural-council')
})
app.get('/sport-council',(req,res)=>{
	res.render('sport-council')
})

app.get('/library',(req,res)=>{
	res.render('library')
})
app.get('/tender',(req,res)=>{
	Tender.find({}).sort({createdAt:-1}).exec(function(err,tenders){
		if(!err){
			res.render('tender',{tenders})
		}
	})

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
app.get('/hostel',(req,res)=>{
	res.render('hostel');
})
app.get('/video',(req,res)=>{
	res.render('video');
})
app.get('/crc',(req,res)=>{
	res.render('crc');
})
app.get('/crc/placements',(req,res)=>{
	res.render('crc_placement');
})
app.get('/examinations/phd-news',(req,res)=>{
	res.render('examinations_phd_news')
})

app.get('/e-tender',(req,res)=>{
	ETender.find({}).sort({createdAt:-1}).exec(function(err,etenders){
		if(!err){
			res.render('etender',{etenders})
		}
	})
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
app.get('/faculty/:name',(req,res)=>{
	var name=req.params.name;
	Faculty.findOne({name},function(err,faculty){
		if(err)
			res.redirect('back')
		else{
			console.log(faculty)
			res.render('profile',{faculty})
		}
	})
})
app.get('/faculty/:name/research',(req,res)=>{
	var name=req.params.name;
	Faculty.findOne({name},function(err,faculty){
		if(err)
			res.redirect('back')
		else{
			res.render('profile_research',{faculty})
		}
	})
})
app.get('/faculty',(req,res)=>{
	var noMatch="";
	var search="";
	if(req.query.search){
		search="foo";
		 const regex = new RegExp(escapeRegex(req.query.search), 'gi');
		Faculty.find({name:regex},(err,faculties)=>{
			var noMatch;
			if(faculties.length<1){
				noMatch="No Results Found!";
			}
		res.render('faculty',{faculties,noMatch,search})
	})
	}
	else
{

	Faculty.find({},(err,faculties)=>{
		res.render('faculty',{faculties,noMatch,search})
	})
}
})
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
function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
};
app.get('/ishanvarshney',(req,res)=>{
	res.redirect('https://github.com/ishvar99')
})


app.get('/placements',(req,res)=>{
	res.render('placements')
})
app.get('/examinations',(req,res)=>{
	res.render('examinations')
});
app.get('/meditation-center',(req,res)=>{
	res.render('meditation')
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
app.get('/pranjalvarshney',(req,res)=>{
	res.redirect('https://github.com/pranjalvarshney')
})
app.get('/mukulrai',(req,res)=>{
	res.redirect('https://github.com/raimukul')
})
app.get('/payment',(req,res)=>{
	res.render('payment')
})
app.get('/sitemap',(req,res)=>{
	res.render('sitemap')
})
app.get('/contact-us',(req,res)=>{
	res.render('contact')
})
app.get('/iqac',function(req,res){
res.render('iqac')
});

app.get('/ugc',(req,res)=>{
	res.render('ugc')
})
app.get('/:type',function(req,res){
	var name=req.params.type;
	if (name=='news' || name=='events' || name=='notices'||name=='workshops'||name=='conferences'||name=='activities'){
		Entity.find({type:req.params.type},function(err,entities){
    	// console.log(entity)
    	if(entities)
          res.render('display',{entities,name});
      	else
      		res.render('404')
    });
	}
	else
		res.render('404');
	
})
app.get('/*',function(req,res){
res.render('404');
});
app.listen(3000,function(){
console.log('Server is listening!')
});