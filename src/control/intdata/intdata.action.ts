import {Action, ActionCreator} from "redux";
import {Intdata} from "./intdata.model";
/**
 * Created by admin on 2017/7/24.
 */
export const SET_INTDATAS = '[Intdata] SET';
export interface SetIntdatasAction extends Action {
  projectid: string;
  intdatas: Intdata[];
}

export const setIntdatas: ActionCreator<SetIntdatasAction> =
  (projectid,intdatas) => ({
    type: SET_INTDATAS,
    projectid: projectid,
    intdatas: intdatas
  });

export const SET_CURRENT_INTDATA = '[intdata] SET CURRENT';
export interface SetCurrentIntdataAction extends Action {
  projectid: string,
  id: string
}
export const setCurrentIntdata: ActionCreator<SetCurrentIntdataAction> =
  (projectid,id) => ({
    type: SET_CURRENT_INTDATA,
    projectid: projectid,
    id: id
  });
