/**
 * Created by admin on 2017/7/21.
 */
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('sqlite/data/project.db');
const create_sql = "CREATE TABLE IF NOT EXISTS project(" +
  "id TEXT PRIMARY KEY  NOT NULL," +
  "name TEXT," +
  "principal TEXT," +
  "create_user TEXT," +
  "create_time DATE," +
  "modify_time DATE," +
  "comment TEXT," +
  "path TEXT," +
  "port INT," +
  "status TEXT" +
  ");";
db.run(create_sql);
