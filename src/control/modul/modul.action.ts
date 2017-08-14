import {Action, ActionCreator} from "redux";
import {Modul} from "./modul.model";
/**
 * Created by admin on 2017/7/24.
 */
export const SET_MODULS = '[Modul] SET';
export interface SetModulsAction extends Action {
  id?: string;
  moduls: Modul[];
}

export const setModuls: ActionCreator<SetModulsAction> =
  (id = 'project',moduls) => ({
    type: SET_MODULS,
    id: id,
    moduls: moduls
  });

export const SET_CURRENT_MODUL = '[modul] SET CURRENT';
export interface SetCurrentModulAction extends Action {
  pid?: string,
  id: string
}
export const setCurrentModul: ActionCreator<SetCurrentModulAction> =
  (pid = 'project',id) => ({
    type: SET_CURRENT_MODUL,
    pid: pid,
    id: id
  });
