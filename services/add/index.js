var thrift = require("thrift");
var AddService = require("./gen-nodejs/AddService");

var server = thrift.createServer(AddService, {
  add: function(n1, n2, result) {
    console.log("add(", n1, ",", n2, ")");
    result(null, n1 + n2);
  },
});

server.listen(8080);
