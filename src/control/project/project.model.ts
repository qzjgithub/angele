/**
 * Created by admin on 2017/6/15.
 */
export interface Project {
  id: string;
  name: string;
  principal: string;
  creae_user: string;
  create_time: Date;
  modify_time?: Date;
  comment?: string;
  path: string;
  port: number;
  status?: string;
  limit?: string;
}
