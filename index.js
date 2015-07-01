var loop = require("parallel-loop");

module.exports = flush;

function keys (db, callback) {
  var keys = [];

  db.createReadStream()
    .on('data', function (row) {
      keys.push(row.key);
    })
    .on('error', function (err) {
      callback(err);
    })
    .on('end', function () {
      callback(undefined, keys);
    });
}


function flush (db, callback) {
  keys(db, function (error, list) {
    if (error) return callback(error);

    loop(list.length, each, callback);

    function each (done, index) {
      db.del(list[index], done);
    }
  });
}
