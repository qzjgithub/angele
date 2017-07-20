/**
 * Created by admin on 2017/7/20.
 */
import * as sqlite3 from "sqlite3";

console.log(sqlite3);
let sqlite = sqlite3.verbose();
let db = new sqlite.Database('sqlite/data/project.db');
console.log(db);
db.all('SELECT * FROM project',function(err,rows){
  console.log(rows);
});
