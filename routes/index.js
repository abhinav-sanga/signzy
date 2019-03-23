var express = require('express');
var router = express.Router();
var fs = require('fs');
var path = require('path');
var rimraf = require("rimraf");

function checktime(tm){
	if(tm <= 9){
		tm = '0'+tm;
	}
	return tm;
}

/* GET home page. */
router.get('/', function(req, res, next) {
	var filetype = [];
	var dt = new Date();
	var days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
	var dayy = days[dt.getDay()];
	var hrs = dt.getHours();
	var mins = dt.getMinutes();
	hrs = checktime(hrs);
	mins = checktime(mins);

	var viewfold = './folders/';

	fs.readdir(viewfold, (err, files) => {
  		files.forEach(file => {
  			var fnty = {}
			var ext = path.extname(path.join('/folders/',file));
			if(ext[0]=='.'){
				fnty['name'] = file;
				fnty['type'] = ext;
				filetype.push(fnty);
			}
			else {
				fnty['name'] = file;
				fnty['type'] = 'folder';
				filetype.push(fnty);
			}
  		});
  	res.render('index',{ title: 'Signzy', day: dayy, hrs: hrs, mins: mins,filetype: JSON.stringify(filetype)});
	});
});

router.post('/', function(req,res){
	if(req.body.id == 'newfo' && req.body.name != null){
		fs.existsSync("./folders/"+req.body.name) || fs.mkdirSync("./folders/"+req.body.name);
		console.log('Folder created successfully!');
	}
	else if(req.body.id == 'newfi' && req.body.name != null){
		fs.existsSync("./folders/"+req.body.name+".txt") || fs.writeFileSync("./folders/"+req.body.name+".txt");
		console.log('File created successfully!');
	}
	else {
		console.log('No functionality added yet');
	}
	res.redirect('/');
});

router.post('/del',function(req,res){
	console.log("./folders/"+req.body.fileid);
	if(req.body.fileid != null){
		rimraf.sync(path.join("./folders/",req.body.fileid));
	}
	// if(req.body.fileid)
	res.redirect('/');
});

module.exports = router;
