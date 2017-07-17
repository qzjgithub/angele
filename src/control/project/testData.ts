import {Project} from "./project.model";
import {Config} from "../config/config.model";
import {deepAssign} from "../../com-util";
/**
 * Created by admin on 2017/6/15.
 */
let config1: Config = {
  id:'1',
  name: 'right1',
  type:'right',
  content:'adfafds'
}
let config2: Config = {
  id:'2',
  name: 'error1',
  type:'error',
  content:'fdgdswefd'
}
let project: Project = {
  id: "1",
  name: "project1",
  principal: "1",
  create_user: "1",
  create_time: new Date(),
  modify_time: new Date(),
  comment: "梵蒂冈d阿道fdsdf夫fgsdf",
  path: "/project1/test1/",
  port: 8080,
  status: "stop",
  limit: "忘了",
  config: [
    // config1,
    // config2
  ]
}
export const projects: Project[] = [
  project,deepAssign(project,{id:'2'}),deepAssign(project,{id:'3'})
]
