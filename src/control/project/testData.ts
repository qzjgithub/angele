import {Project} from "./project.model";
/**
 * Created by admin on 2017/6/15.
 */
let project: Project = {
  id: "1",
  name: "project1",
  principal: "user1",
  creae_user: "user1",
  create_time: new Date(),
  modify_time: new Date(),
  comment: "测试所用项目",
  path: "/project1/test1",
  port: 8080,
  status: "stop",
  limit: "忘了"
}
export const projects: Project[] = [
  project
]
