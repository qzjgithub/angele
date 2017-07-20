"use strict";
exports.__esModule = true;
/**
 * Created by admin on 2017/7/20.
 */
var sqlite3 = require("sqlite3");
console.log(sqlite3);
var sqlite = sqlite3.verbose();
var db = new sqlite.Database('sqlite/data/project.db');
console.log(db);
db.all('SELECT * FROM project', function (err, rows) {
    console.log(rows);
});
