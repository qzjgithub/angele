/**
 * Created by admin on 2017/6/15.
 */
import {
  Project
} from './project.model';
import {Action, ActionCreator} from "redux";

export const SET_PROJECTS = '[Project] SET';
export interface SetProjectsAction extends Action {
  projects: Project[]
}
export const setProjects: ActionCreator<SetProjectsAction> =
  (projects) => ({
    type: SET_PROJECTS,
    projects: projects
  });
