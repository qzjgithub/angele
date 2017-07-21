/**
 * Created by admin on 2017/7/21.
 */
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
window.dbutil.sql(window.dbutil.getRootDB(),function(db){
  db.run(create_sql);
});

window.projectdb = {
  getAllProjects(){
    return new Promise((resolve,reject) => {
      window.dbutil.sql(window.dbutil.getRootDB(),function(db){
        db.all('SELECT * FROM project',function(err,rows){
          if(err){
            reject();
          }else{
            resolve(rows);
          }
        });
      });
    });
  },
  add:function (data) {
    return new Promise((resolve,reject) => {
      window.dbutil.sql(window.dbutil.getRootDB(),function(db){
        var sql = "'INSERT INTO project VALUES ( " +
          "$id ," +
          "$name" +
          "$principal" +
          "$create_user" +
          "$create_time" +
          "$modify_time" +
          "$comment" +
          "$path" +
          "$port" +
          "$status" +
          "$limit" +
          ")";
        var obj_data = {};
        for(var key in data){
          obj_data['$'+key] = data[key];
        }
        db.run(sql,obj_data);
      });
    });
  }
}
