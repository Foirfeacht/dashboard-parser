var express = require('express');
var router = express.Router();
var pdf = require('pdfcrowd');

/* GET home page. */
router.get('/', function(req, res, next) {
  //res.render('index', { title: 'Express' });
    //res.sendFile(path.join(__dirname, '../views', 'index.html'));
    res.render('index');
});

router.get('/print', function(req, res, next) {
	console.log('start');
	// create an API client instance
	var client = new pdf.Pdfcrowd("Vitalym", "5ed3874d8b99f468a8bdc1453fe498d0");
	console.log(client);

// convert a web page and save it to a file
	client.convertURI('https://almsaeedstudio.com/AdminLTE', pdf.saveToFile("./public/output/file.pdf"));
});

module.exports = router;
