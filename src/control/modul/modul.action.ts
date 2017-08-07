import {Action, ActionCreator} from "redux";
import {Modul} from "./modul.model";
/**
 * Created by admin on 2017/7/24.
 */
export const SET_MODULS = '[Modul] SET';
export interface SetModulsAction extends Action {
  id: string;
  ptype: String;
  moduls: Modul[];
}

export const setModuls: ActionCreator<SetModulsAction> =
  (id,ptype,moduls) => ({
    type: SET_MODULS,
    id: id,
    ptype: ptype,
    moduls: moduls
  });

export const SET_CURRENT_MODUL = '[modul] SET CURRENT';
export interface SetCurrentModulAction extends Action {
  pid: string,
  ptype: string,
  id: string
}
export const setCurrentModul: ActionCreator<SetCurrentModulAction> =
  (pid,ptype,id) => ({
    type: SET_CURRENT_MODUL,
    pid: pid,
    ptype: ptype,
    id: id
  });
