var test = require("prova");
var flush = require("./");
var levelup = require("levelup");
var loop = require("parallel-loop");
var db = levelup("/tmp/flush-test-db");

var insert = [
  [ 'foo', 'bar' ],
  [ 'qux', 'corge' ],
  [ 'span', 'eggs' ]
];

test('the fill function', function (t) {
  t.plan(7);

  fill(function (errors) {
    t.error(errors);

    db.get('foo', function (error, value) {
      t.error(error);
      t.equal(value, insert[0][1]);
    });

    db.get('qux', function (error, value) {
      t.error(error);
      t.equal(value, insert[1][1]);
    });

    db.get('span', function (error, value) {
      t.error(error);
      t.equal(value, insert[2][1]);
    });
  });
});

test('flush', function (t) {
  t.plan(7);

  fill(function () {
    flush(db, function (error) {
      t.error(error);

      db.get('foo', function (error, value) {
        t.ok(error);
        t.notOk(value);
      });

      db.get('qux', function (error, value) {
        t.ok(error);
        t.notOk(value);
      });

      db.get('span', function (error, value) {
        t.ok(error);
        t.notOk(value);
      });
    });
  });
});

function fill (callback) {
  loop(insert.length, each, callback);

  function each (done, index) {
    var row = insert[index];
    db.put(row[0], row[1], done);
  }
}
