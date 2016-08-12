var fs = require("fs");
var decode = require("../index.js");

// both raw pokemon go traffic dumps
var req = fs.readFileSync("0_req.dump");
var res = fs.readFileSync("0_res.dump");

var options = {
  decodeLongs: true
};

var output = decode(req, res, options); // returns decoded request and response

fs.writeFileSync("output.json", JSON.stringify(output, null, 2));