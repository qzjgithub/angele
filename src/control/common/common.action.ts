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

export const ADD_POSITION = '[Position] ADD';
export interface AddPositionAction extends Action{
  pos : string;
}
export const addPosition: ActionCreator<AddPositionAction> =
  (pos) => ({
    type: ADD_POSITION,
    pos: pos
  });

export const DELETE_POSITION = '[Position] DELETE';
export interface DeletePositionAction extends Action{
  step : number;
}
export const deletePosition: ActionCreator<DeletePositionAction> =
  (step) => ({
    type: DELETE_POSITION,
    step: step
  });

export const RESET_POSITION = '[Position] RESET';
export interface ResetPositionAction extends Action{
  position : Array<string>;
}
export const resetPosition: ActionCreator<ResetPositionAction> =
  (position) => ({
    type: RESET_POSITION,
    position: position
  });
