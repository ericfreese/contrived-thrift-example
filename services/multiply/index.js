var thrift = require("thrift");
var AddService = require('./gen-nodejs/AddService');
var MultiplyService = require("./gen-nodejs/MultiplyService");

var createClient = function(opts) {
  var connection = thrift.createConnection(opts.hostname, opts.port, {
    transport : thrift.TBufferedTransport,
    protocol : thrift.TBinaryProtocol
  });

  connection.on('error', function(err) {
    console.error(err);
  });

  return thrift.createClient(opts.service, connection);
}

var addClient = createClient({
  hostname: 'add',
  port: 8080,
  service: AddService
});

var server = thrift.createServer(MultiplyService, {
  multiply: async function(n1, n2, result) {
    console.log("multiply(", n1, ",", n2, ")");

    var sum = 0;

    for (var i = 0; i < n2; i++) {
      sum = await addClient.add(sum, n1);
    }

    result(null, sum);
  },
});

server.listen(8080);
