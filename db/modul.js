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
          "comment TEXT," +
          "path TEXT," +
          "jurisdiction TEXT," +
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
          "$comment ," +
          "$path ," +
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
   * 删除模块
   * @param ids
   * @param names
   */
  delete: function(name,ids){
    return new Promise((resolve,reject) => {
      window.dbutil.sql(window.dbutil.getProjectDB(name),function(db){
        var stm = db.prepare('DELETE FROM modul WHERE id = ?');
        ids.forEach((e,i)=>{
          stm.run(e, (err,row)=>{
            if(err){
              reject();
            }else{
              i === ids.length - 1 && resolve();
            }
          });
        });
        stm.finalize();
      });
    });
  },
  /**
   * 更新模块
   * @param id
   * @param project
   */
  update: function(name,id,modul){
    return new Promise((resolve,reject) => {
      window.dbutil.sql(window.dbutil.getProjectDB(name),function(db){
        var sql = 'UPDATE modul SET ' +
          'name = $name, ' +
          'modify_time = $modify_time, ' +
          'comment = $comment, ' +
          'path = $path ' +
          'WHERE id = $id';
        var stm = db.prepare(sql);
        var param = {
          $id: id,
          $name: modul.name,
          $modify_time: new Date(),
          $comment: modul.comment,
          $path: modul.path
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
