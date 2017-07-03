import {Project} from "./project.model";
/**
 * Created by admin on 2017/6/15.
 */
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
    {name: 'right1',type:'right',content:'adfafds'},
    {name: 'right2',type:'right',content:'asadfasdfafds'}
  ]
}
export const projects: Project[] = [
  project
]
