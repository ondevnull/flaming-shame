var multilevel = require('multilevel');
var net = require('net');
var connection = net.connect(4545);
var db = multilevel.client();

connection.pipe(db.createRpcStream()).pipe(connection);

db.get('multilevelmeup', function (err, data) {
  if (err)
    console.error(err);

  console.log(data);
  connection.end();
});
