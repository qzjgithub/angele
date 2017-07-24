/**
 * Created by admin on 2017/7/24.
 */
window.moduldb = {
  createDb(id){
    window.dbutil.sql(window.dbutil.getProjectDB('pro'+id),function(db){
      var create_sql = "CREATE TABLE IF NOT EXISTS modul(" +
        "id INTEGER PRIMARY KEY AUTOINCREMENT  NOT NULL," +
        "name TEXT," +
        "principal TEXT," +
        "create_user TEXT," +
        "create_time DATE," +
        "modify_time DATE," +
        "comment TEXT," +
        "path TEXT," +
        "jurisdiction TEXT" +
        ");";
      db.run();
    });
  },
  getModulsByProId(){
    window.dbutil.sql(window.dbutil.getProjectDB('pro'+id),function(db){
      db.all('SELECT * FROM modul',function(err,rows){
        if(err){
          reject();
        }else{
          resolve(rows);
        }
      });
    })
  }
}
