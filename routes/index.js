var express = require('express');
var router = express.Router();
var pdf = require('pdfcrowd');
var fs = require('fs');
var wkhtmltopdf = require('wkhtmltopdf');
var phantom = require('phantom');
//var pdf = require('phantom-html2pdf');
//var pdf = require('html-pdf');
var webshot = require('webshot');
var PDFDocument = require('pdfkit');


/* GET home page. */
router.get('/', function(req, res, next) {
  //res.render('index', { title: 'Express' });
    //res.sendFile(path.join(__dirname, '../views', 'index.html'));
    res.render('index');
});

router.get('/print', function(req, res, next) {
	console.log('start');
	/*var options = {
		"html": "https://almsaeedstudio.com/AdminLTE"
	};
	pdf.convert(options, function(result) {
		console.log('started converting');
		result.toFile("./public/output/out.pdf", function() {});

	});*/
	/*var page = require('webpage').create();
	console.log(page);
	page.open('https://almsaeedstudio.com/AdminLTE', function() {
		var url = page.url;
		console.log('URL: ' + url);
		console.log('started render');
		page.render('./public/output/out.pdf');
		phantom.exit();
	});*/
	/*pdf.create('https://almsaeedstudio.com/AdminLTE', options).toFile('./public/output/out.pdf', function(err, res) {
		if (err) return console.log(err);
		console.log(res); // { filename: '/app/businesscard.pdf' }
	});*/

	//wkhtmltopdf('https://almsaeedstudio.com/AdminLTE', { output: './public/output/out.pdf' });
	/*webshot('https://almsaeedstudio.com/AdminLTE', './public/output/out.pdf', function(err) {
		// screenshot now saved to google.png
		console.log('saved');
	});*/
	/*var doc = new PDFDocument;
	doc.addPage().link(100, 100, 160, 27, 'https://almsaeedstudio.com/AdminLTE');
	doc.pipe(fs.createWriteStream('./public/output/out.pdf'));

	//

	doc.end();*/

	/*phantom.create(function(ph){
		ph.createPage(function(page) {
			page.open("https://almsaeedstudio.com/AdminLTE", function(status) {
				page.render('google.pdf', function(){

					console.log('Page Rendered');
					ph.exit();

				});
			});
		});
	});*/

	phantom.create(function(ph) {
		return ph.createPage(function(page) {
			return page.open("https://almsaeedstudio.com/AdminLTE", function(status) {
				console.log("opened page? ", status);
				return page.render('out', function(){

					console.log('Page Rendered');
					var pdf = fs.read('out');
					fs.write("./public/output/", pdf, "w");
					console.log('created');
					return ph.exit();

				});
			});
		});
	}, {
		dnodeOpts: {weak: false}
	});

	//doc.write("./public/output/output.pdf");
	console.log('saved');

});

module.exports = router;
