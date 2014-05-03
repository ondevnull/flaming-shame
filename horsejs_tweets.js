module.exports = function (db, date, callback) {
  var res = [];

  db.createReadStream({ start: date, end: date + '\xff' })
  .on('data', function (data) {
    res.push(data.value);
  }).on('error', function (err) {
    return callback(err);
  }).on('end', function () {
    return callback(null, res);
  });
};
