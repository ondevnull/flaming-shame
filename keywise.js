var level = require('level');
var db = level(process.argv[2], { valueEncoding: 'json' });
var json = require(process.argv[3]);

var batch = db.batch();

json.forEach(function (element, idx) {
  if (element.type === 'user') {
    batch.put(element.name, element);
  } else if (element.type === 'repo') {
    batch.put(element.user + '!' + element.name, element);
  }

  if ((idx + 1) === json.length)
    finished(batch);
});

function finished(batch) {
  batch.write(function (err) {
    if (err)
      console.error('error', err);
  });
}
