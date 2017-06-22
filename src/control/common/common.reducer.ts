import {Action} from "redux";
import * as CommonActions from './common.action';
import {deepAssign} from "../../com-util";
import {createSelector} from "reselect";
/**
 * Created by admin on 2017/6/22.
 */
export interface ClickEntity {
  counter: number;
  status: boolean;
}
export interface CommonState {
  click: ClickEntity;
}

const initialState: CommonState = {
  click: {
    counter: 0,
    status: false
  }
}

export const CommonReducer =
  function(state: CommonState = initialState, action: Action): CommonState {
    switch (action.type) {
      case CommonActions.ADD_CLICK: {
        const status = (<CommonActions.AddClickAction>action).status;
        let c = state.click.counter;
        c = c + 1;
        return deepAssign(state,{
          click: {
            counter: c,
            status: status
          }
        })
      }
      case CommonActions.SET_CLICK: {
        const status = (<CommonActions.AddClickAction>action).status;
        return deepAssign(state,{
          click: {
            status: status
          }
        })
      }
      default:
        return state;
    }
  };

export const getCommonState = (state): CommonState => state.common;

export const getClickEntity = createSelector(
  getCommonState,
  ( state: CommonState ) => state.click );
