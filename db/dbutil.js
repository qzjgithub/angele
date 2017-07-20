/**
 * Created by admin on 2017/7/19.
 */
var sqlite3 = require('sqlite3').verbose();
var dbroot = 'sqlite/data/';
/**
 * 根据路径得到数据库
 * @param path
 * @returns {sqlite3.Database}
 */
var getDB = function(path) {
  return new sqlite3.Database(path);
};
module.exports.getDB = getDB;
/**
 * 得到保存项目的数据库
 * @returns {sqlite3.Database}
 */
var getRootDB = function (){
  return getDB(dbroot+'project.db');
}
console.log(getRootDB());
module.exports.getRootDB = getRootDB;
/**
 * 根据项目名称得到对应的数据库
 * @param project
 * @returns {sqlite3.Database}
 */
/*dbutil.getProjectDB = function (project){
  return dbutil.getDB(dbroot + project + '.db');
}*/

/**
 * 查询数据库
 * @param db
 * @param fun
 */
var sql = function (db,fun){
  db.serialize(function() {
    fun(db);
  });
  db.close();
}
module.exports.sql = sql;
