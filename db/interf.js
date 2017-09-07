/**
 * Created by admin on 2017/7/24.
 */
window.interfdb = {
  createDb(name){
    return new Promise((resolve, reject) => {
      window.dbutil.sql(window.dbutil.getProjectDB(name),function(db){
        var create_sql = "CREATE TABLE IF NOT EXISTS interf(" +
          "id INTEGER PRIMARY KEY AUTOINCREMENT  NOT NULL," +
          "principal TEXT," +
          "create_user TEXT," +
          "create_time DATE," +
          "modify_time DATE," +
          "method TEXT," +
          "full_path TEXT," +
          "path TEXT," +
          "comment TEXT," +
          "jurisdiction TEXT," +
          "parent INTEGER" +
          ")";
        db.run(create_sql,function(err){
          if(err){
            reject(err);
          }else{
            resolve('interf create');
          }
        });
      });
    })
  },
  getInterfsByProName(name){
    return new Promise((resolve, reject) => {
      window.dbutil.sql(window.dbutil.getProjectDB(name),function(db){
        db.all('SELECT * FROM interf',function(err,rows){
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
   * 添加接口
   * @param data
   */
  add:function (name,data) {
    return new Promise((resolve,reject) => {
      window.dbutil.sql(window.dbutil.getProjectDB(name),function(db){
        var sql = "INSERT INTO interf VALUES( " +
          "null ," +
          "$principal ," +
          "$create_user ," +
          "$create_time ," +
          "$modify_time ," +
          "$method ," +
          "$full_path ," +
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
   * 删除接口
   * @param ids
   * @param names
   */
  delete: function(name,ids){
    return new Promise((resolve,reject) => {
      window.dbutil.sql(window.dbutil.getProjectDB(name),function(db){
        var stm = db.prepare('DELETE FROM interf WHERE id = ?');
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
  update: function(name,id,interf){
    return new Promise((resolve,reject) => {
      window.dbutil.sql(window.dbutil.getProjectDB(name),function(db){
        var sql = 'UPDATE interf SET ' +
          'method = $method,' +
          'modify_time = $modify_time, ' +
          'comment = $comment, ' +
          'path = $path ' +
          'WHERE id = $id';
        var stm = db.prepare(sql);
        var param = {
          $id: id,
          $method: interf.method,
          $modify_time: new Date(),
          $comment: interf.comment,
          $path: interf.path
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
