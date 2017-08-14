import {Action, ActionCreator} from "redux";
import {Modul} from "./modul.model";
/**
 * Created by admin on 2017/7/24.
 */
export const SET_MODULS = '[Modul] SET';
export interface SetModulsAction extends Action {
  projectid: string;
  moduls: Modul[];
}

export const setModuls: ActionCreator<SetModulsAction> =
  (projectid,moduls) => ({
    type: SET_MODULS,
    projectid: projectid,
    moduls: moduls
  });

export const SET_CURRENT_MODUL = '[modul] SET CURRENT';
export interface SetCurrentModulAction extends Action {
  projectid: string,
  id: string
}
export const setCurrentModul: ActionCreator<SetCurrentModulAction> =
  (projectid,id) => ({
    type: SET_CURRENT_MODUL,
    projectid: projectid,
    id: id
  });
