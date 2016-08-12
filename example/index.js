const fs = require("fs");
const decode = require("../index.js");

// both raw pokemon go traffic dumps
let req = fs.readFileSync("./0_req.dump");
let res = fs.readFileSync("./0_res.dump");

console.log(decode(req, res)); // decoded request and response object