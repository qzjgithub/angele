/**
 * Created by admin on 2017/7/21.
 */
import * as sqlite from "sqlite3";

const sqlite3 = sqlite.verbose();
const dbroot = 'sqlite/data/';

/**
 * 根据路径得到数据库
 * @param path
 * @returns {sqlite3.Database}
 */
export function getDB(path){
  return new sqlite3.Database(path);
}

/**
 * 得到保存项目的数据库
 * @returns {sqlite3.Database}
 */
export function getRootDB(){
  return getDB(dbroot+'project.db');
}

/**
 * 根据项目名称得到对应的数据库
 * @param project
 * @returns {sqlite3.Database}
 */
export function getProjectDB(project){
 return getDB(dbroot + project + '.db');
 }

/**
 * 查询数据库
 * @param db
 * @param fun
 */
export function sql(db,fun){
  db.serialize(function() {
    fun(db);
  });
  db.close();
}
