/**
 * Created by admin on 2017/7/24.
 */
window.moduldb = {
  createDb(name){
    return new Promise((resolve, reject) => {
      window.dbutil.sql(window.dbutil.getProjectDB(name),function(db){
        var create_sql = "CREATE TABLE IF NOT EXISTS modul(" +
          "id INTEGER PRIMARY KEY AUTOINCREMENT  NOT NULL," +
          "name TEXT," +
          "principal TEXT," +
          "create_user TEXT," +
          "create_time DATE," +
          "modify_time DATE," +
          "path TEXT," +
          "jurisdiction TEXT," +
          "comment TEXT," +
          "parent INTEGER" +
          ")";
        db.run(create_sql,function(err){
          if(err){
            reject(err);
          }else{
            resolve();
          }
        });
      });
    })
  },
  getModulsByProName(name){
    return new Promise((resolve, reject) => {
      window.dbutil.sql(window.dbutil.getProjectDB(name),function(db){
        db.all('SELECT * FROM modul',function(err,rows){
          if(err){
            reject();
          }else{
            resolve(rows);
          }
        });
      })
    });
  },
  /**
   * 添加模块
   * @param data
   */
  add:function (name,data) {
    return new Promise((resolve,reject) => {
      window.dbutil.sql(window.dbutil.getProjectDB(name),function(db){
        var sql = "INSERT INTO modul VALUES( " +
          "null ," +
          "$name ," +
          "$principal ," +
          "$create_user ," +
          "$create_time ," +
          "$modify_time ," +
          "$path ," +
          "$comment ," +
          "$jurisdiction ," +
          "$parent" +
          ")";
        console.log(sql);
        var obj_data = {};
        for(var key in data){
          obj_data['$'+key] = data[key];
        }
        var stm = db.prepare(sql);
        stm.run(obj_data,function(err){
          if(err){
            reject();
          }else{
            resolve();
          }
        });
        stm.finalize();
      });
    });
  },
  /**
   *
   * @param ids
   * @param names
   */
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
}
