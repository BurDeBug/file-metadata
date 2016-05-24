 var express = require('express');
 var fs = require('fs');
 
 var app = express();

 var multer = require('multer');
 
 var upload = multer({
     dest: 'uploads/'
 })

 app.use('/public', express.static(process.cwd() + '/public'));

 app.get('/', function(req, res) {
     res.sendFile(process.cwd() + '/public/index.html')
 })

 app.post('/fileanalyse', upload.single('data'), function(req, res) {

     fs.unlink(req.file.path, function(err) {
         if (err) throw err;
         console.log('FileDeleted')
     })

     res.json({
         'name': req.file.originalName,
         'type': req.file.mimetype,
         'size': req.file.size
     })

 })


 app.listen(8080, function() {
     console.log('Node.js listening on port 8080...');
 });