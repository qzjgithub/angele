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

export const SET_CURRENT_PROJECT = '[Project] SET CURRENT';
export interface SetCurrentProjectAction extends Action {
  id: string
}
export const setCurrentProject: ActionCreator<SetCurrentProjectAction> =
  (id) => ({
    type: SET_CURRENT_PROJECT,
    id: id
  });

export const SET_DISABLED = '[Project] SET DISABLED';
export interface SetDisabledAction extends Action {
  disabled: boolean
}
export const setDisabled: ActionCreator<SetDisabledAction> =
  (disabled) => ({
    type: SET_CURRENT_PROJECT,
    disabled: disabled
  });
