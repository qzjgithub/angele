/**
 * Created by admin on 2017/7/21.
 */

var sqlite3 = require('sqlite3').verbose();
const dbroot = 'sqlite/data/';

window.dbutil = {
  getDB: function(path){
    return new sqlite3.Database(path);
  },
  getRootDB: function(){
    return window.dbutil.getDB(dbroot+'project.db');
  },
  getProjectDB: function(project){
    return window.dbutil.getDB(dbroot + project + '.db');
  },
  sql: function(db,fun){
    db.serialize(function() {
      fun(db);
    });
    db.close();
  }
}
