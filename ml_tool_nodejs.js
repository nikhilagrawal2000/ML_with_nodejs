var http = require('http');
var formidable = require('formidable');
var fs = require('fs');

const PORT = 8080;

console.log("Pic ML Tool - Example backend in node.js");
console.log("Listening in: " + PORT);

http.createServer(function (req, res) {
  if (req.method != "POST") {
    res.writeHead(405);
    res.end();
    return;
  }
  var form = new formidable.IncomingForm();
  form.parse(req, function (err, fields, files) {
    if (!('file' in files)) {
      res.writeHead(404)
      res.end();
      return;
    }
    var f = files['file'];
    console.log("File: \""+ f.name +"\" (" + f.size + " bytes)");
    if ('annotation' in fields) {
      console.log("Annotation: \"" + fields['annotation'] + "\"");
    }
    try {
      fs.rename(f.path, "/tmp/" + f.name, function (err) {
        if (err) throw err;
      });
    } catch (err) {
      res.writeHead(500);
      res.end();
      return;
    }
    console.log("Saved in: /tmp/" + f.name);
    res.writeHead(201)
    //res.write("Paco")
    res.end();
  })
}).listen(PORT);