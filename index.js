var fs = require("fs");
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
  var respKey = key[0].toUpperCase() + key.substring(1, key.length).replace(/_\s*([a-z])/g, (d, e) => { return e.toUpperCase(); });
  return (respKey);
};

function dump(req, res) {

  if (!(req instanceof Buffer))
  throw new Error("Invalid request buffer");

  if (!(res instanceof Buffer))
  throw new Error("Invalid response buffer");

  var deco_req = proto.Networking.Envelopes.RequestEnvelope.decode(req);
  var deco_res = proto.Networking.Envelopes.ResponseEnvelope.decode(res);

  var requests = [];
  var responses = [];

  var ii = 0;
  var length = deco_res.returns.length;

  for (; ii < length; ++ii) {
    var key = generateResponseKey(deco_req.requests[ii]);
    var req_result = proto.Networking.Requests.Messages[key + "Message"].decode(deco_req.requests[ii].request_message);
    var res_result = proto.Networking.Responses[key + "Response"].decode(deco_res.returns[ii]);
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

module.exports = dump;