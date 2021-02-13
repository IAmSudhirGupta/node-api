var express = require('express');
var router = express.Router();
var bodyParser = require('body-parser');
var fileExtension = require('file-extension');

router.use(bodyParser.urlencoded({ extended: true }));
router.use(bodyParser.json());

router.post('/image', function(req, res) {

    if(req.files === undefined) {
        return res.status(400).send({status:"error", message:"No files were uploaded."});
    }
    if (Object.keys(req.files).length == 0) {
        return res.status(400).send({status:"error", message:"No files were uploaded."});
    }

    let sampleFile = req.files.files;
    var extensions = ["jpg", "png", "jpeg"];
    let extension = fileExtension(sampleFile.name);
    if(!extensions.includes(extension)) {
        return res.status(400).send({status:"error", message:extensions.join('|')+" extension supproted only!"});
    }
    // sampleFile.mv('uploads/'+sampleFile.name, function(err) {
    //     if (err)
    //     return res.status(500).send(err);

    //     res.send('File uploaded!');
    // });
    res.send({status:"success",message:"File uploaded!"});
  });
  router.post('/excel', function(req, res) {
    if(req.files === undefined) {
        return res.status(400).send({status:"error", message:"No files were uploaded."});
    }
    if (Object.keys(req.files).length == 0) {
        return res.status(400).send({status:"error", message:"No files were uploaded."});
    }

    let sampleFile = req.files.files;
    var extensions = ["xls", "xlsx", "csv"];
    let extension = fileExtension(sampleFile.name);
    if(!extensions.includes(extension)) {
        return res.status(400).send({status:"error", message:extensions.join('|')+" extension supproted only!"});
    }

    // sampleFile.mv('uploads/'+sampleFile.name, function(err) {
    //     if (err)
    //     return res.status(500).send(err);

    //     res.send({status:"success",message:"File uploaded!"});
    // });
    res.send({status:"success",message:"File uploaded!"});
  });
  router.post('/pdf', function(req, res) {
    if(req.files === undefined) {
        return res.status(400).send({status:"error", message:"No files were uploaded."});
    }
    if (Object.keys(req.files).length == 0) {
        return res.status(400).send({status:"error", message:"No files were uploaded."});
    }

    let sampleFile = req.files.files;
    var extensions = ["doc", "docx", "pdf"];
    let extension = fileExtension(sampleFile.name);
    if(!extensions.includes(extension)) {
        return res.status(400).send({status:"error", message:extensions.join('|')+" extension supproted only!"});
    }

    // sampleFile.mv('uploads/'+sampleFile.name, function(err) {
    //     if (err)
    //     return res.status(500).send(err);

    //     res.send({status:"success",message:"File uploaded!"});
    // });
    res.send({status:"success",message:"File uploaded!"});
  });

  router.post('/all', function(req, res) {
    if(req.files === undefined) {
        return res.status(400).send({status:"error", message:"No files were uploaded."});
    }
    if (Object.keys(req.files).length == 0) {
        return res.status(400).send({status:"error", message:"No files were uploaded."});
    }

    let sampleFile = req.files.files;

    // sampleFile.mv('uploads/'+sampleFile.name, function(err) {
    //     if (err)
    //     return res.status(500).send(err);

    //     res.send({status:"success",message:"File uploaded!"});
    // });
    res.send({status:"success",message:"File uploaded!"});
  });

module.exports = router;