/**
 * Created by admin on 2017/7/24.
 */
window.intdatadb = {
  createDb(name){
    return new Promise((resolve, reject) => {
      window.dbutil.sql(window.dbutil.getProjectDB(name),function(db){
        var create_sql = "CREATE TABLE IF NOT EXISTS intdata(" +
          "id INTEGER PRIMARY KEY AUTOINCREMENT  NOT NULL," +
          "name TEXT," +
          "create_time DATE," +
          "modify_time DATE," +
          "type TEXT," +
          "code INT," +
          "content TEXT," +
          "status BOOLEAN," +
          "comment TEXT," +
          "parent INTEGER" +
          ")";
        db.run(create_sql,function(err){
          if(err){
            reject(err);
          }else{
            resolve('intdata create');
          }
        });
      });
    })
  },
  /**
   * 得到某一项目的所有模拟数据
   * @param name
   */
  getIntdatasByProName(name){
    return new Promise((resolve, reject) => {
      window.dbutil.sql(window.dbutil.getProjectDB(name),function(db){
        db.all('SELECT * FROM intdata',function(err,rows){
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
   * 得到某接口下的激活的模拟数据
   * @param name
   * @param status
   */
  getActiveIntdataByParent: function(name,parent){
    return new Promise((resolve, reject) => {
      window.dbutil.sql(window.dbutil.getProjectDB(name),function(db){
        db.get('SELECT * FROM intdata WHERE status = "true" and parent = "'+ parent +'"',function(err,rows){
          if(err){
            reject(err);
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
      this.clearActive(name,data).then(()=>{
        window.dbutil.sql(window.dbutil.getProjectDB(name),function(db){
          var sql = "INSERT INTO intdata VALUES( " +
            "null ," +
            "$name ," +
            "$create_time ," +
            "$modify_time ," +
            "$type ," +
            "$code ," +
            "$content ," +
            "$status ," +
            "$comment ," +
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
        var stm = db.prepare('DELETE FROM intdata WHERE id = ?');
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
  update: function(name,id,intdata){
    return new Promise((resolve,reject)=>{
      this.clearActive(name,intdata,id).then(() => {
        window.dbutil.sql(window.dbutil.getProjectDB(name),function(db){
          var sql = 'UPDATE intdata SET ' +
            'name = $name, ' +
            'modify_time = $modify_time, ' +
            'type = $type, ' +
            'code = $code,' +
            'content = $content, ' +
            'status = $status, ' +
            'comment = $comment, ' +
            'parent = $parent ' +
            'WHERE id = $id';
          var stm = db.prepare(sql);
          var param = {
            $id: id,
            $name: intdata.name,
            $modify_time: new Date(),
            $type: intdata.type,
            $code: intdata.code,
            $content: intdata.content,
            $status: intdata.status,
            $comment: intdata.comment,
            $parent: intdata.parent
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
    });
  },
  clearActive: function(name,intdata,orignId){
    if(intdata.status=="true"){
      return this.getActiveIntdataByParent(name,intdata.parent).then((row)=>{
        if(!orignId || orignId != row.id){
          new Promise((reslove,reject) =>{
            row['status'] = "false";
            window['intdatadb'].update(name,row.id,row).then(()=>{
              reslove();
            });
          })
        }
      }).catch((err)=> {
        console.log(err);
        return err;
      })
    }else{
      return new Promise((reslove,reject) =>{
        reslove();
      })
    }
  }
}
