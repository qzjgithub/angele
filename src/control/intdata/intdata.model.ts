import {Config} from "../config/config.model";
/**
 * Created by admin on 2017/7/18.
 */
export interface Intdata {
  id: string;
  name: string;
  create_time: Date;
  modify_time?: Date;
  type: string;
  code: number;
  content: string,
  status?:boolean;
  comment?: string;
  parent: string;
}
