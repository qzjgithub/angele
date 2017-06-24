/**
 * Created by admin on 2017/6/5.
 */
import {Validators} from "@angular/forms";
/**
 * 深度拷贝对象
 * @param objects 对象数组
 * @returns {{}} 一个对象
 */
export function deepAssign(...objects){
  return objects.reduce((a,b) => {
    if(b instanceof Object){
      return merge(a, b);
    }else{
      return a;
    }
  },{});
}

/**
 * 深度拷贝两个对象
 * 深度拷贝对象帮助方法
 * @param a
 * @param b
 * @returns {any}
 */
function merge(a, b){
  let keys = Object.keys(b);
  if(!keys.length) a = b;
  keys.forEach(e => {
    if(b[e] instanceof Function){
      a[e] = b[e];
    }else if(b[e] instanceof Object){
      a[e] = merge(a[e] instanceof Object ? a[e] : {},b[e]);
    } else {
      a[e] = b[e];
    }
  });
  return a;
}

/**
 * 得到全书纯数字字符串转换的整型数
 * @param number
 * @returns {any}
 */
export function getIntTrue(number){
  if(number && new RegExp(/^\d$/).test(number)){
    return parseInt(number, 10);
  }else{
    return -1;
  }
}

/**
 * 设置是否必填的验证规则
 * @returns {Array}
 */
export function setRequiredValidator(param, validMsg){
  let required = param['required'];
  let validator = [];
  if(required){
    validMsg['required'] = typeof required === 'string' ? required : '不可为空';
    validator.push(Validators.required);
  }
  return validator;
}
