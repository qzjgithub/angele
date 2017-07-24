import {Config} from "../config/config.model";
/**
 * Created by admin on 2017/7/18.
 */
export interface Modul {
  id: string;
  name: string;
  principal: string;
  create_user: string;
  create_time: Date;
  modify_time?: Date;
  comment?: string;
  path: string;
  limit?: string;
  config?: Array<Config>;
}
