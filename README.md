# POGOdecode <a href="https://www.npmjs.com/package/pogo-decode"><img src="https://img.shields.io/npm/v/pogo-decode.svg?style=flat-square" alt="NPM Version" /></a>

Decode Pokemon GO requests with their equivalent responses.

## Install

```
$ npm install --save pogo-decode
```

## Usage
```js
var fs = require("fs");
var decode = require("../index.js");

// both raw pokemon go traffic dumps
var req = fs.readFileSync("0_req.dump");
var res = fs.readFileSync("0_res.dump");

var options = {
  decodeLongs: true,
  removeNulls: true
};

var output = decode(req, res, options); // returns decoded request and response
```

## API

### decode(request, response, options)

| Parameter       | Type            | Description
|-----------------|-----------------|---------------
| request         | *Buffer*        | Request buffer 
| response        | *Buffer*        | Response buffer
| options         | *object*        | [Options](#options)
| @returns        | *object*        | Corresponding output

## Options

| Parameter       | Type            | Description
|-----------------|-----------------|---------------
| decodeLong      | *boolean*       | Automatically decode longs
| removeNulls     | *boolean*       | Remove all null keys
| encodeBuffers   | *boolean*       | Encode buffers to binary

---