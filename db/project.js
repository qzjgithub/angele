var dbutil = require('./dbutil');
/**
 * Created by admin on 2017/7/19.
 */
getAllProjects = function (){
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
};
module.exports.getAllProjects = getAllProjects;
getAllProjects().then((rows) => console.log(rows));
