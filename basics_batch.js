var level = require('level');
var db = level(process.argv[2]);
var fs = require('fs');
var fileStream = fs.createReadStream(process.argv[3], { encoding: 'utf8' });
var split = require('split');

db.on('ready', function () {
  var batch = db.batch();
  fileStream.pipe(split())
  .on('data', function (chunk) {
    var line = chunk.split(',');
    if (line[0] === 'put')
      batch.put(line[1], line[2]);
    else if (line[0] === 'del')
      batch.del(line[1]);
    else
      throw new Error('There\'s a differente value than put or del');
  }).on('end', function () {
    batch.write(function (err) {
      if (err)
        console.error('response', err);
    });
  });
});
