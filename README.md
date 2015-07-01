## level-flush

Remove all keys in given LevelDB database. Use only in small databases.

## Install

```bash
$ npm install level-flush
```

## Usage

```js
var flush = require('level-flush')
var levelup = require('levelup')
var db = levelup('./db')

flush(db, function (error) {
  if (error) throw error
  // done
})
```
