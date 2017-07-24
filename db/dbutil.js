/**
 * Created by admin on 2017/7/21.
 */
window.dbutil = {
  sqlite3 : require('sqlite3').verbose(),
  dbroot : 'sqlite/data/',
  getDB: function(path){
    return new window.dbutil.sqlite3.Database(path);
  },
  getRootDB: function(){
    return window.dbutil.getDB(window.dbutil.dbroot+'project.db');
  },
  getProjectDB: function(project){
    return window.dbutil.getDB(window.dbutil.dbroot + project + '.db');
  },
  sql: function(db,fun){
    db.serialize(function() {
      fun(db);
    });
    db.close();
  }
}
