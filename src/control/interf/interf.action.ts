import {Action, ActionCreator} from "redux";
import {Interf} from "./interf.model";
/**
 * Created by admin on 2017/7/24.
 */
export const SET_INTERFS = '[Interf] SET';
export interface SetInterfsAction extends Action {
  projectid: string;
  interfs: Interf[];
}

export const setInterfs: ActionCreator<SetInterfsAction> =
  (projectid,interfs) => ({
    type: SET_INTERFS,
    projectid: projectid,
    interfs: interfs
  });

export const SET_CURRENT_INTERF = '[interf] SET CURRENT';
export interface SetCurrentInterfAction extends Action {
  projectid: string,
  id: string
}
export const setCurrentInterf: ActionCreator<SetCurrentInterfAction> =
  (projectid,id) => ({
    type: SET_CURRENT_INTERF,
    projectid: projectid,
    id: id
  });
