import {Action, ActionCreator} from "redux";
/**
 * Created by admin on 2017/6/22.
 */
export const ADD_CLICK = '[Click] ADD';
export interface AddClickAction extends Action {
  status: boolean;
}
export const addClick: ActionCreator<AddClickAction> =
  (status) => ({
    type: ADD_CLICK,
    status: status
  });

export const SET_CLICK = '[Click] SET';
export interface SetClickAction extends Action {
  status: boolean;
}
export const setClick: ActionCreator<SetClickAction> =
  (status) => ({
    type: SET_CLICK,
    status: status
  });
