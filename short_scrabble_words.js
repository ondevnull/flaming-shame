module.exports.init = function (db, words, callback) {
  var batch = db.batch();

  words.forEach(function (element, idx) {
    batch.put(element.length + '!' + element, element);
    
    if ((idx + 1) === words.length)
      finished();
  });

  function finished () {
    batch.write(function (err) {
      return callback();
    });
  }
};

module.exports.query = function (db, word, callback) {
  var res = [];

  var key = word.length + '!' + word.replace(/\*/g, '');

  db.createReadStream({ start: key, end: key + '\xff' })
  .on('data', function (data) {
    res.push(data.value);
  }).on('error', function (err) {
    return callback(err);
  }).on('end', function () {
    return callback(null, res);
  });
};
