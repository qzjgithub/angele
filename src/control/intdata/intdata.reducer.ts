import {Intdata} from "./intdata.model";
import {Action} from "redux";
import * as IntdataActions from './intdata.action';
import {deepAssign} from "../../com-util";
import {createSelector} from "reselect";
/**
 * Created by admin on 2017/7/24.
 */
export interface IntdatasEntities {
  [id: string]: Intdata;
}

export interface IntdatasOnProEntities {
  ids: string[];
  entities: IntdatasEntities;
  currentIntdataId?: string;
};

export interface IntdatasState {
  [id: string]: IntdatasOnProEntities;
}

const initialState: IntdatasState = { };

export const IntdatasReducer =
  function(state: IntdatasState = initialState, action: Action): IntdatasState {
    switch (action.type){
      case IntdataActions.SET_INTDATAS:{
        const projectid = (<IntdataActions.SetIntdatasAction>action).projectid;
        const interfs = (<IntdataActions.SetIntdatasAction>action).intdatas;
        let ids = [],entities = {},currentIntdataId = null;
        interfs.forEach((e) =>{
          ids.push(e.id+'');
          entities[e.id+''] = e;
        });
        currentIntdataId = state[projectid] ?
          ids.indexOf(state[projectid].currentIntdataId)>-1 ?
            state[projectid].currentIntdataId : null : null;

        let result = Object.assign(state,{
          [projectid]:{
            ids:ids,
            currentIntdataId: currentIntdataId,
            entities: entities
          }
        });

        console.log(result);

        return result;
      }
      case IntdataActions.SET_CURRENT_INTDATA:{
        const projectid = (<IntdataActions.SetCurrentIntdataAction>action).projectid;
        const id = (<IntdataActions.SetCurrentIntdataAction>action).id;
        return state[projectid] ? deepAssign(state,{
          [projectid]:{
            currentIntdataId:id
          }
          }) : state;
      }
      default:
        return state;
    }
  }

  //得到某一项目下的模拟数据state
export const getIntdatasState = (state, id): IntdatasOnProEntities => {
  return state.intdatas[id];
}

//得到某一项目下的所有模拟数据键值对象
export const getIntdatasEntities = createSelector(
  getIntdatasState,
  ( state: IntdatasOnProEntities):IntdatasEntities => state ? state.entities : {});

export const getAllIntdatas = createSelector(
  getIntdatasEntities,
  ( entities: IntdatasEntities ) => entities ? Object.keys(entities)
    .map((id) => entities[id]) : []);


//得到某一项目下某一模块下的接口
export const getOneIntdatasEntities = (state,projectid,modulid) => {
  projectid = projectid+'';
  if(null===projectid||undefined===projectid||''===projectid) return [];
  let intdataObj = state['intdatas'][projectid] || { ids : [] };
  let allIntdatas = [];
  intdataObj.ids.length && intdataObj.ids.forEach(function(e){
    allIntdatas.push(intdataObj.entities[e]);
  });
  let oneIntdatas = [];
  //如果projectid不存在，就强制赋值null
  if("null"==modulid||null==modulid||undefined==modulid||''==modulid) modulid = null;
  modulid = typeof modulid === "string" ? parseInt(modulid) : modulid;
  allIntdatas.forEach((intdata)=>{
    intdata.parent === modulid && oneIntdatas.push(intdata);
  });
  return oneIntdatas;
}

/**
 * 得到被选中接口的id
 * @type {OutputSelector<S, string, (res:ModulsOnProEntities)=>string>}
 */
export const getCurrentIntdataId = createSelector(
  getIntdatasState,
  ( state: IntdatasOnProEntities ) => state ? state.currentIntdataId : '');

/**
 * 得到被选中模块对象
 * @type {OutputSelector<S, Modul, (res:ModulsOnProEntities)=>Modul>}
 */
export const getCurrentIntdata = createSelector(
  getIntdatasState,
  ( state: IntdatasOnProEntities ) => state ? state.entities[state.currentIntdataId] : null);

/**
 * 根据模块id得到具体模块
 * @param state
 * @param projectid
 * @param modulid
 * @returns {any}
 */
export const getIntdataById = (state,projectid,intdataid) => {
  return state['intdatas'][projectid]['entities'][intdataid];
}
