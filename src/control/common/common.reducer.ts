import {Action} from "redux";
import * as CommonActions from './common.action';
import {deepAssign} from "../../com-util";
import {createSelector} from "reselect";
/**
 * Created by admin on 2017/6/22.
 */
/**
 * 点击事件store数据模型
 */
export interface ClickEntity {
  counter: number;
  status: boolean;
}
export interface CommonState {
  click: ClickEntity;
  position: Array<string>
}

const initialState: CommonState = {
  click: {
    counter: 0,
    status: false
  },
  position: new Array<string>()
}

export const CommonReducer =
  function(state: CommonState = initialState, action: Action): CommonState {
    switch (action.type) {
      case CommonActions.ADD_CLICK: {
        const status = (<CommonActions.AddClickAction>action).status;
        let c = state.click.counter;
        c = c + 1;
        c = c >= 10000 ? 0 : c;
        state.click.counter = c;
        state.click.status = status;
        return state;
      }
      case CommonActions.SET_CLICK: {
        const status = (<CommonActions.AddClickAction>action).status;
        state.click.status = status;
        return state;
      }
      case CommonActions.ADD_POSITION: {
        const pos = (<CommonActions.AddPositionAction>action).pos;
        state.position.push(pos);
        return state;
      }
      case CommonActions.DELETE_POSITION: {
        const step = (<CommonActions.DeletePositionAction>action).step;
        let position = state.position;
        position = step >= position.length ? [] : position.slice(0,position.length - step);
        return deepAssign(state,{
          position: position
        });
      }
      case CommonActions.RESET_POSITION: {
        const position = (<CommonActions.ResetPositionAction>action).position;
        state.position = position;
        return deepAssign(state,{
          position : position
        });
      }
      default:
        return state;
    }
  };

export const getCommonState = (state): CommonState => state.common;

export const getClickEntity = createSelector(
  getCommonState,
  ( state: CommonState ) => state.click );

export const getPosition = createSelector(
  getCommonState,
  ( state: CommonState ) => state.position );
