'use strict';

var express = require('express');
var app = express();
var multer = require('multer');

app.set('port', process.env.PORT || 5000);
app.use(multer({dest: '/tmp/'}).array('upl'));
app.use(require('multer-autoreap'));

app.get('/', function(req, res) {
    res.sendFile(process.cwd() + '/public/index.html');
});

app.post('/api/file-meta-data', function(req, res) {
    if (!req.files.length) {
        return res.status(400).json({
            err: 'No Files Uploaded'
        });
    }
    res.status(200).json(req.files.map(function(file) {
        return {
            name: file.originalname,
            size: file.size,
            type: file.mimetype
        };
    }));
});

app.listen(app.get('port'), function() {
    console.log('Node app is running on port', app.get('port'));
});
