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
        const id = (<ModulActions.SetModulsAction>action).id;
        const moduls = (<ModulActions.SetModulsAction>action).moduls;
        let ids = [],entities = {},currentModulId = null;
        moduls.map((e) =>{
          e.config = e.config || [];
          ids.push(e.id);
          entities[e.id] = e;
        });
        currentModulId = state[id] ?
          ids.indexOf(state[id].currentModulId)>-1 ?
            state[id].currentModulId : null : null;

        return deepAssign(state,{
          [id]:{
            ids:ids,
            currentModulId: currentModulId,
            entities: entities
          }
        });
      }
      case ModulActions.SET_CURRENT_MODUL:{
        const pid = (<ModulActions.SetCurrentModulAction>action).pid;
        const id = (<ModulActions.SetCurrentModulAction>action).id;
        return state[pid] ? deepAssign(state,{
          [pid]:{
            currentModulId:id
          }
          }) : state;
      }
      default:
        return state;
    }
  }

export const getModulsState = (state, id): ModulsOnProEntities => state.moduls[id];

export const getModulsEntities = createSelector(
  getModulsState,
  ( state: ModulsOnProEntities):ModulsEntities => state.entities );

export const getAllModuls = createSelector(
  getModulsEntities,
  ( entities: ModulsEntities ) => Object.keys(entities)
    .map((modulId) => entities[modulId]));

export const getCurrentModId = createSelector(
  getModulsState,
  ( state: ModulsOnProEntities ) => state.currentModulId);

export const getCurrentModul = createSelector(
  getModulsState,
  ( state: ModulsOnProEntities ) => state.entities[state.currentModulId]);
