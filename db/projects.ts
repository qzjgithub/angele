/**
 * Created by admin on 2017/7/21.
 */
import * as dbutil from './dbutils';

export function getAllProjects(){
  return new Promise((resolve,reject) => {
    dbutil.sql(dbutil.getRootDB(),function(db){
      db.all('SELECT * FROM project',function(err,rows){
        if(err){
          reject();
        }else{
          resolve(rows);
        }
      });
    });
  });
}

getAllProjects().then((rows) => console.log(rows));
