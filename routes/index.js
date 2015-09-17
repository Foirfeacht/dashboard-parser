var express = require('express');
var router = express.Router();
var phantom = require('phantom');
var fs = require('fs');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index');
});

router.post('/print', function (req, res, next) {
    console.log('start');
    console.log(req.body.urlAddress);
    if (!req.body.urlAddress) {
        req.body.urlAddress = 'https://almsaeedstudio.com/AdminLTE';
    }
    phantom.create(function (ph) {
        ph.createPage(function (page) {
            page.open(req.body.urlAddress, function (status) {
                console.log(status);
                var fileName = req.body.urlAddress.replace('://', '_').replace(' ', '_').replace('.', '_').replace('/', '_');
                var serverPath = './public/output/' + fileName + '.pdf';
                console.log(serverPath);
                page.render(serverPath, {format: 'pdf', quality: '100'});
                ph.exit();
                console.log("finished");
            });
        });
    }, {
        dnodeOpts: {weak: false}
    });
    console.log('not async finished');
});

module.exports = router;
