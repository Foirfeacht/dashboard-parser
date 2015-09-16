var express = require('express');
var router = express.Router();
var fs = require('fs');
var phantom = require('phantom');
var util = require('util');

/* GET home page. */
router.get('/', function (req, res, next) {
    res.render('index');
});

router.post('/print', function (req, res, next) {
    console.log('start');
    if (!req.body.urlAddress) {
        req.body.urlAddress = 'https://almsaeedstudio.com/AdminLTE';
    }
    util.log('Request: \n method: ' + req.method + '\n url: ' + req.url)
    phantom.create(function (ph) {
        ph.createPage(function (page) {
            page.open(req.body.urlAddress, function (status) {
                console.log(status);
                var serverPath ='./public/output/' + req.body.urlAddress.replace('://', '_').replace(' ', '_').replace('.', '_').replace('/','_') + '.pdf';
                console.log(serverPath);
                page.render(serverPath, {format: 'pdf', quality: '100'});
                ph.exit();
                console.log("finished");
            });
        });
    }, {
        dnodeOpts: {weak: false}
    });
});

module.exports = router;
