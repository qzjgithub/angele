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
  getModulsByProId(){
    return new Promise((resolve, reject) => {
      window.dbutil.sql(window.dbutil.getProjectDB('pro'+id),function(db){
        db.all('SELECT * FROM modul',function(err,rows){
          if(err){
            reject();
          }else{
            resolve(rows);
          }
        });
      })
    });
  }
}
