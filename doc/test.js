/**
 * Created by admin on 2017/7/21.
 */
var sqlite3 = require('sqlite3').verbose();
var db = new sqlite3.Database('sqlite/project.db');
/*const create_sql = "CREATE TABLE IF NOT EXISTS project(" +
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
  ");";*/
// db.run(create_sql);
db.serialize(function(){

  /*db.run('CREATE TABLE IF NOT EXISTS info(' +
    'id TEXT PRIMARY KEY  NOT NULL,' +
    'name TEXT,' +
    'time DATE,' +
    'modify_time DATE,' +
    'port INT' +
    ');')*/

  /*var stm = db.prepare('INSERT INTO info VALUES($id,$name,$time,$modify_time,$port)');

  stm.run({$id:"1",$name:'aaa',$time:new Date(),$modify_time:new Date(),$port:8080});
  stm.finalize();*/
  db.each('SELECT * FROM info',function(err,row){
    console.log(row);
  });
  /*var sql = 'UPDATE project SET ' +
    'name = $name, ' +
    'modify_time = $modify_time, ' +
    'comment = $comment, ' +
    'path = $path, ' +
    'port = $port ' +
    'WHERE id = $id';
  var stm = db.prepare(sql);
  var param = {
    $id: 11,
    $name:'aaa',
    $modify_time: new Date(),
    $comment: 'aaa',
    $path: 'aaa',
    $port: 8080
  }
  stm.run(param);
  stm.finalize();*/
})
db.close();

var fs = require('fs');
fs.mkdirSync('sqlite/project1');
