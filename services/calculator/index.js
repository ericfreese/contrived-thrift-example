var thrift = require('thrift');
var AddService = require('./gen-nodejs/AddService');
var MultiplyService = require('./gen-nodejs/MultiplyService');

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

var multiplyClient = createClient({
  hostname: 'multiply',
  port: 8080,
  service: MultiplyService
});

addClient.add(4, 3, function(err, response) {
  console.log("4+3=" + response);
});

multiplyClient.multiply(6, 8, function(err, response) {
  console.log("6*8=" + response);
});
