const protobuf = require("protobufjs");
const path = require("path");

module.exports = protobuf.loadProtoFile({ root: path.join(__dirname, "./"), file: "POGOProtos/POGOProtos.proto" }).build("POGOProtos");