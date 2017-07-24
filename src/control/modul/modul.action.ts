import {Action, ActionCreator} from "redux";
import {Modul} from "./modul.model";
/**
 * Created by admin on 2017/7/24.
 */
export const SET_MODULS = '[Modul] SET';
export interface SetModulsAction extends Action {
  id: string;
  moduls: Modul[];
}

export const setModuls: ActionCreator<SetModulsAction> =
  (id,moduls) => ({
    type: SET_MODULS,
    id: id,
    moduls: moduls
  });
