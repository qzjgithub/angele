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

/**
 * 设置长度验证规则
 * @returns {Array}
 */
export function setLengthValidator(param,validMsg){
  let length = param['length'];
  if(!length) return [];
  //验证规则数组，‘-’符号位置，最小长度，最大长度
  let validator = [],index = length.indexOf('-'),min,max;
  if(index===0){
    max = length.substring(1,length.length);
  }else if(index===(length.length - 1)){
    min = length.substring(0,length.length - 1);
  }else if(index > -1){
    let lenArr = length.split('-');
    min = lenArr[0];
    max = lenArr[1];
  }
  max = getIntTrue(max);
  max > -1 && validator.push(Validators.maxLength(getIntTrue(max)));
  validMsg['maxlength'] = max > -1 ? ('最大长度为'+ max) : '';

  min = getIntTrue(min);
  min > -1 && validator.push(Validators.minLength(min));
  validMsg['minlength'] = max > -1 ? ('最小长度为'+ min) : '';
  return validator;
}

/**
 * 设置数据类型验证
 */
export function setDataTypeValidator(param,validMsg){
  let dataType = param['dataType'],msg = '',validator = [];
  if(!dataType) return [];
  if(dataType instanceof Object){
    msg = dataType['msg'];
    dataType = dataType['type'];
  }

  dataType = dataType.toUpperCase();
  let reg;
  switch(dataType){
    case 'TEXT':
      reg = /^\S*$/;
      validator.push(Validators.pattern(reg));
     validMsg['pattern'] = msg || '正则验证不通过';
      break;
    case 'PATH':
      reg = /^\/([\S]+\/)*$/;
      validator.push(Validators.pattern(reg));
      validMsg['pattern'] = msg || '不符合路径规则';
      break;
    case 'NUMBER':
      reg = /^\d+$/;
      validator.push(Validators.pattern(reg));
      validMsg['pattern'] = msg || '输入的不全是数字';
      break;
  }
  return validator;
}

/**
 * 设置自定义验证
 * @returns {Array}
 */
export function setRegValidator(param,validMsg){
  let regular = param['regular'];
  if(!regular) return [];
  let validator = [], keys = Object.keys(regular);
  keys.length && keys.forEach((e,i) => {
    var item = regular[e];
    let name = item.name || ('reg_'+i);
    validator.push(Validators.patternName(item.reg, name));
    validMsg[name] = item.msg;
  });
  return validator;
}
