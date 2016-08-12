var fs = require("fs");
var long = require("long");
var proto = require("./proto.js");
var REQUEST = require("./requests.js");

function getRequestType(req) {
  for (var key in REQUEST) {
    if (REQUEST[key] === req.request_type) {
      return (key);
    }
  };
  throw new Error("Invalid request type!");
};

function generateResponseKey(id) {
  var key = getRequestType(id).toLowerCase();
  var respKey = key[0].toUpperCase() + key.substring(1, key.length).replace(/_\s*([a-z])/g, function(d, e) {
    return e.toUpperCase();
  });
  return (respKey);
};

function dump(req, res, opt) {

  opt = opt instanceof Object ? opt : {};

  if (!(req instanceof Buffer))
  throw new Error("Invalid request buffer");

  if (!(res instanceof Buffer))
  throw new Error("Invalid response buffer");

  var deco_req = proto.Networking.Envelopes.RequestEnvelope.decode(req);
  var deco_res = proto.Networking.Envelopes.ResponseEnvelope.decode(res);

  if (deco_req.requests.length !== deco_res.returns.length) {
    throw new Error("Request length doesnt match response length");
  }

  var requests = [];
  var responses = [];

  var ii = 0;
  var length = deco_req.requests.length;

  for (; ii < length; ++ii) {
    var key = generateResponseKey(deco_req.requests[ii]);
    var req_result = proto.Networking.Requests.Messages[key + "Message"].decode(deco_req.requests[ii].request_message);
    var res_result = proto.Networking.Responses[key + "Response"].decode(deco_res.returns[ii]);
    if (opt.decodeLongs === true) {
      decodeLongs(req_result);
      decodeLongs(res_result);
    }
    if (opt.removeNulls === true) {
      removeNulls(req_result);
      removeNulls(res_result);
    }
    requests.push({
      name: key + "Message",
      request: req_result
    });
    responses.push({
      name: key + "Response",
      request: res_result
    });
  };

  return ({
    request: requests,
    response: responses
  });

};

function decodeLongs(obj) {

  var node = null;

  for (var key in obj) {
    node = obj[key];
    if (typeof node === "object" && node !== null) {
      if (
        node.hasOwnProperty("high") &&
        node.hasOwnProperty("low") &&
        node.hasOwnProperty("unsigned")
      ) {
        var value = long.fromBits(node.high, node.low, !!long.unsigned);
        obj[key] = parseInt(value.toString());
      }
      decodeLongs(node);
    }
  };

};

function removeNulls(obj) {

  var node = null;

  for (var key in obj) {
    node = obj[key];
    if (node === null) {
      delete obj[key];
    }
    else if (typeof node === "object") {
      removeNulls(node);
    }
  };

};

module.exports = dump;