# POGOdecode <a href="https://www.npmjs.com/package/pogo-decode"><img src="https://img.shields.io/npm/v/pogo-decode.svg?style=flat-square" alt="NPM Version" /></a>

Decode Pokemon GO requests with their equivalent responses.

## Install

```
$ npm install --save pogo-decode
```

## Usage
```js
import fs from "fs";
import decode from "pogo-decode";

// both raw pokemon go traffic dumps
let req = fs.readFileSync("./dumps/getplayer_req.dump");
let res = fs.readFileSync("./dumps/getplayer_res.dump");

console.log(decode(req, req)); // decoded request and response object
```


## API

### decode(req: Buffer, res: Buffer) => object
