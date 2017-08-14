import {Modul} from "./modul.model";
import {Action} from "redux";
import * as ModulActions from './modul.action';
import {deepAssign} from "../../com-util";
import {createSelector} from "reselect";
/**
 * Created by admin on 2017/7/24.
 */
export interface ModulsEntities {
  [id: string]: Modul;
}

export interface ModulsOnProEntities {
  ids: string[];
  entities: ModulsEntities;
  currentModulId?: string;
};

export interface ModulsState {
  [id: string]: ModulsOnProEntities;
}

const initialState: ModulsState = { };

export const ModulsReducer =
  function(state: ModulsState = initialState, action: Action): ModulsState {
    switch (action.type){
      case ModulActions.SET_MODULS:{
        const projectid = (<ModulActions.SetModulsAction>action).projectid;
        const moduls = (<ModulActions.SetModulsAction>action).moduls;
        let ids = [],entities = {},currentModulId = null;
        moduls.map((e) =>{
          e.config = e.config || [];
          ids.push(e.id);
          entities[e.id] = e;
        });
        currentModulId = state[projectid] ?
          ids.indexOf(state[projectid].currentModulId)>-1 ?
            state[projectid].currentModulId : null : null;

        return deepAssign(state,{
          [projectid]:{
            ids:ids,
            currentModulId: currentModulId,
            entities: entities
          }
        });
      }
      case ModulActions.SET_CURRENT_MODUL:{
        const projectid = (<ModulActions.SetCurrentModulAction>action).projectid;
        const id = (<ModulActions.SetCurrentModulAction>action).id;
        return state[projectid] ? deepAssign(state,{
          [projectid]:{
            currentModulId:id
          }
          }) : state;
      }
      default:
        return state;
    }
  }

  //得到某一项目下的模块state
export const getModulsState = (state, id): ModulsOnProEntities => state.moduls[id];

//得到某一项目下的所有模块键值对象
export const getModulsEntities = createSelector(
  getModulsState,
  ( state: ModulsOnProEntities):ModulsEntities => state ? state.entities : {});

export const getAllModuls = createSelector(
  getModulsEntities,
  ( entities: ModulsEntities ) => entities ? Object.keys(entities)
    .map((modulId) => entities[modulId]) : []);


//得到某一项目下某一模块下的模块
export const getOneModulsEntities = (state,projectid,modulid) => {
  if(null===projectid||undefined===projectid||''===projectid) return [];
  let allModuls = getAllModuls(state,projectid);
  let oneModuls = [];
  //如果projectid不存在，就强制赋值''
  if(null==modulid||undefined==modulid||''==modulid) modulid = '';
  allModuls.forEach((modul)=>{
    modul.parent === modulid && oneModuls.push(modul);
  });
  return oneModuls;
}

export const getCurrentModId = createSelector(
  getModulsState,
  ( state: ModulsOnProEntities ) => state ? state.currentModulId : '');

export const getCurrentModul = createSelector(
  getModulsState,
  ( state: ModulsOnProEntities ) => state ? state.entities[state.currentModulId] : []);
