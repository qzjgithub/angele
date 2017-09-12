import {Interf} from "./interf.model";
import {Action} from "redux";
import * as InterfActions from './interf.action';
import {deepAssign} from "../../com-util";
import {createSelector} from "reselect";
/**
 * Created by admin on 2017/7/24.
 */
export interface InterfsEntities {
  [id: string]: Interf;
}

export interface InterfsOnProEntities {
  ids: string[];
  entities: InterfsEntities;
  currentInterfId?: string;
};

export interface InterfsState {
  [id: string]: InterfsOnProEntities;
}

const initialState: InterfsState = { };

export const InterfsReducer =
  function(state: InterfsState = initialState, action: Action): InterfsState {
    switch (action.type){
      case InterfActions.SET_INTERFS:{
        const projectid = (<InterfActions.SetInterfsAction>action).projectid;
        const interfs = (<InterfActions.SetInterfsAction>action).interfs;
        let ids = [],entities = {},currentInterfId = null;
        interfs.forEach((e) =>{
          e.config = e.config || [];
          ids.push(e.id+'');
          entities[e.id+''] = e;
        });
        currentInterfId = state[projectid] ?
          ids.indexOf(state[projectid].currentInterfId)>-1 ?
            state[projectid].currentInterfId : null : null;

        let result = Object.assign(state,{
          [projectid]:{
            ids:ids,
            currentInterfId: currentInterfId,
            entities: entities
          }
        });

        console.log(result);

        return result;
      }
      case InterfActions.SET_CURRENT_INTERF:{
        const projectid = (<InterfActions.SetCurrentInterfAction>action).projectid;
        const id = (<InterfActions.SetCurrentInterfAction>action).id;
        return state[projectid] ? deepAssign(state,{
          [projectid]:{
            currentInterfId:id
          }
          }) : state;
      }
      default:
        return state;
    }
  }

  //得到某一项目下的接口state
export const getInterfsState = (state, id): InterfsOnProEntities => {
  return state.interfs[id];
}

//得到某一项目下的所有接口键值对象
export const getInterfsEntities = createSelector(
  getInterfsState,
  ( state: InterfsOnProEntities):InterfsEntities => state ? state.entities : {});

export const getAllInterfs = createSelector(
  getInterfsEntities,
  ( entities: InterfsEntities ) => entities ? Object.keys(entities)
    .map((id) => entities[id]) : []);


//得到某一项目下某一模块下的接口
export const getOneInterfsEntities = (state,projectid,modulid) => {
  projectid = projectid+'';
  if(null===projectid||undefined===projectid||''===projectid) return [];
  let interfObj = state['interfs'][projectid] || { ids : [] };
  let allInterfs = [];
  interfObj.ids.length && interfObj.ids.forEach(function(e){
    allInterfs.push(interfObj.entities[e]);
  });
  let oneInterfs = [];
  //如果projectid不存在，就强制赋值null
  if("null"==modulid||null==modulid||undefined==modulid||''==modulid) modulid = null;
  modulid = typeof modulid === "string" ? parseInt(modulid) : modulid;
  allInterfs.forEach((interf)=>{
    interf.parent === modulid && oneInterfs.push(interf);
  });
  return oneInterfs;
}

/**
 * 得到被选中接口的id
 * @type {OutputSelector<S, string, (res:ModulsOnProEntities)=>string>}
 */
export const getCurrentIntId = createSelector(
  getInterfsState,
  ( state: InterfsOnProEntities ) => state ? state.currentInterfId : '');

/**
 * 得到被选中模块对象
 * @type {OutputSelector<S, Modul, (res:ModulsOnProEntities)=>Modul>}
 */
export const getCurrentInterf = createSelector(
  getInterfsState,
  ( state: InterfsOnProEntities ) => state ? state.entities[state.currentInterfId] : null);

/**
 * 根据模块id得到具体模块
 * @param state
 * @param projectid
 * @param modulid
 * @returns {any}
 */
export const getInterfById = (state,projectid,interfid) => {
  return state['interfs'][projectid]['entities'][interfid];
}
