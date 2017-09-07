import {Config} from "../config/config.model";
/**
 * Created by admin on 2017/7/18.
 */
export interface Interf {
  id: string;
  principal: string;
  create_user: string;
  create_time: Date;
  modify_time?: Date;
  method: string;
  comment?: string;
  path: string;
  full_path?: string;
  parent?: string;
  jurisdiction?: string;
  config?: Array<Config>;
}
