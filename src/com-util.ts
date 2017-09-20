/**
 * Created by admin on 2017/6/5.
 */
import {Validators} from "@angular/forms";
import {SimpleDateFormat} from "./DateFormat";
import * as input from 'app/component/input/input.model';
import * as select from 'app/component/select/select.model';
import * as textarea from 'app/component/textarea/textarea.model';
import * as file from 'app/component/file/file.model';
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
  // if(!keys.length) a = b;
  keys.forEach(e => {
    if(b[e] instanceof Function){
      a[e] = b[e];
    }else if(b[e] instanceof Array){
      a[e] = b[e];
    }else if(b[e] instanceof Date){
      a[e] = b[e];
    }else if(b[e] instanceof Object){
      a[e] = deepAssign(a[e] instanceof Object ? a[e] : {},b[e]);
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
      reg = /^.*$/;
      validator.push(Validators.pattern(reg));
     validMsg['pattern'] = msg || '正则验证不通过';
      break;
    case 'PATH':
      // reg = /^\/([\S]+\/)*$/;
      /^(\/[\S]*)+$/;
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

/**
 * 根据key值设置所有参数的key属性为同一个值
 * @param valueKey
 * @param value
 */
export function setParamOneValue(valueKey,value,param){
  let keys = Object.keys(param);
  keys.forEach((v, i) => {
    setParamByKey(v,{[valueKey]:value},param);
  })
}

/**
 * 根据key值重新设置参数值
 * @param key
 * @param data
 */
export function setParamByKey(key, data, param){
  param[key] = deepAssign(param[key],data);
}

/**
 * 根据一条数据设置所有输入项的值
 */
export function setValue(data,param){
  var keys = Object.keys(param);
  keys.forEach((v, i) => {
    setParamByKey(v,{['value']:data[v]},param);
  })
}
/**
 * 转换时间格式
 */
export function setDateFormat(date, format = "yyyy-MM-dd HH:mm:ss"){
  // var str = format ? format : "yyyy?MM?dd? HH:mm:ss";
  let df = new SimpleDateFormat();
  df.applyPattern(format);
  return df.format(date);
}

/**
 * 统一设置参数格式
 */
export function setParam(param){
  let keys = Object.keys(param);
  keys.forEach(key => {
    switch(param[key]['type']){
      case 'input':
        param[key] = deepAssign(input.param,param[key]);
        break;
      case 'select':
        param[key] = deepAssign(select.param,param[key]);
        break;
      case 'textarea':
        param[key] = deepAssign(textarea.param,param[key]);
        break;
      case 'file':
        param[key] = deepAssign(file.param,param[key]);
        break;
    }
  });
}
