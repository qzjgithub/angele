/**
 * Created by admin on 2017/7/21.
 */
/*const create_sql = "CREATE TABLE IF NOT EXISTS project(" +
  "id INTEGER PRIMARY KEY AUTOINCREMENT  NOT NULL," +
  "name TEXT," +
  "principal TEXT," +
  "create_user TEXT," +
  "create_time DATE," +
  "modify_time DATE," +
  "comment TEXT," +
  "path TEXT," +
  "port INT," +
  "status TEXT," +
  "jurisdiction TEXT" +
  ");";
window.dbutil.sql(window.dbutil.getRootDB(),function(db){
  db.run(create_sql);
});*/

window.projectdb = {
  /**
   * 得到所有的项目
   */
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
  /**
   * 添加项目
   * @param data
   */
  add:function (data) {
    return new Promise((resolve,reject) => {
      window.dbutil.sql(window.dbutil.getRootDB(),function(db){
        var sql = "INSERT INTO project VALUES( " +
          "null ," +
          "$name ," +
          "$principal ," +
          "$create_user ," +
          "$create_time ," +
          "$modify_time ," +
          "$comment ," +
          "$path ," +
          "$port ," +
          "$status ," +
          "$jurisdiction" +
          ")";
        var obj_data = {};
        for(var key in data){
          obj_data['$'+key] = data[key];
        }
        var stm = db.prepare(sql);
        stm.run(obj_data,function(err){
          if(err){
            reject();
          }else{
            window['dbutil'].initPro(data.name);
            resolve();
          }
        });
        stm.finalize();
      });
    });
  },
  delete: function(ids,names){
    return new Promise((resolve,reject) => {
      window.dbutil.sql(window.dbutil.getRootDB(),function(db){
        var stm = db.prepare('DELETE FROM project WHERE id = ?');
        ids.forEach((e,i)=>{
          stm.run(e, (err,row)=>{
            if(err){
              reject();
            }else{
              window.dbutil.removeDir(names[e]);
              i === ids.length - 1 && resolve();
            }
          });
        });
        stm.finalize();
      });
    });
  },
  update: function(id,project){
    return new Promise((resolve,reject) => {
      window.dbutil.sql(window.dbutil.getRootDB(),function(db){
        var sql = 'UPDATE project SET ' +
          'name = $name, ' +
          'modify_time = $modify_time, ' +
          'comment = $comment, ' +
          'path = $path, ' +
          'port = $port ' +
          'WHERE id = $id';
        var stm = db.prepare(sql);
        var param = {
          $id: id,
          $name: project.name,
          $modify_time: new Date(),
          $comment: project.comment,
          $path: project.path,
          $port: project.port
        }
        stm.run(param,(err,row)=>{
          if(err){
            reject(err);
          }else{
            resolve(row);
          }
        });
        stm.finalize();
      });
    });
  }
}
