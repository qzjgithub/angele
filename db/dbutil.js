/**
 * Created by admin on 2017/7/21.
 */
var window = {}
window.dbutil = {
  sqlite3 : require('sqlite3').verbose(),
  dbroot : __dirname.substring(0,__dirname.lastIndexOf('\\')) + '/sqlite/',
  getDB: function(path){
    return new window.dbutil.sqlite3.Database(path);
  },
  getRootDB: function(){
    return window.dbutil.getDB(window.dbutil.dbroot+'project.db');
  },
  getProjectDB: function(project){
    return window.dbutil.getDB(window.dbutil.dbroot + project + '/storage.db');
  },
  sql: function(db,fun){
    db.serialize(function() {
      fun(db);
    });
    db.close();
  },
  createDir: function (name) {
    var fs = require('fs');
    fs.mkdirSync(window.dbutil.dbroot+name);
  },
  removeDir: function(name){
    var fs = require('fs');
    var path = window.dbutil.dbroot+name;
    fs.existsSync(path) && fs.readdir(path,(err,files)=>{
      var rmfile = function(i){
        if(i<files.length){
          fs.unlink(path+'/'+files[i],(err)=>{
            if(!err){
              rmfile(++i);
            }
          })
        }else{
          fs.rmdir(path);
        }
      }
      rmfile(0);
    })
  },
  initPro: function(name){
    window.dbutil.createDir(name);
    window.moduldb.createDb(name).then(()=>{
      window.interfdb.createDb(name)
    }).then((row)=>{
      console.log(row)
    })
    window.intdatadb.createDb(name);
  }
}
