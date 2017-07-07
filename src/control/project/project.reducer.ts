/**
 * Created by admin on 2017/6/15.
 */
import { Action } from 'redux';
import {Project} from "./project.model";
import { createSelector } from 'reselect';
import * as ProjectActions from './project.action';

export interface ProjectsEntities {
  [id: string]: Project;
}

export interface ProjectsState {
  ids: string[];
  entities: ProjectsEntities;
  currentProjectId?: string;
  disabled: boolean
};

const initialState: ProjectsState = {
  ids: [],
  currentProjectId: null,
  entities: {},
  disabled: false
};

/**
 * The `ThreadsReducer` describes how to modify the `ThreadsState` given a
 * particular action.
 */
export const ProjectsReducer =
  function(state: ProjectsState = initialState, action: Action): ProjectsState {
    switch (action.type) {
      case ProjectActions.SET_PROJECTS: {
        const projects = (<ProjectActions.SetProjectsAction>action).projects;
        let ids = [],entities = {};
        projects.map((e) => {
          ids.push(e.id);
          entities[e.id] = e;
        });
        return {
          ids: [ ...state.ids, ...ids ],
          currentProjectId: state.currentProjectId,
          entities: Object.assign({}, state.entities, entities),
          disabled: state.disabled
        };
      }
      case ProjectActions.SET_CURRENT_PROJECT: {
        const id = (<ProjectActions.SetCurrentProjectAction>action).id;
        return {
          ids: [ ...state.ids ],
          currentProjectId: id,
          entities: state.entities,
          disabled: state.disabled
        };
      }
      case ProjectActions.SET_DISABLED: {
        const disabled = (<ProjectActions.SetDisabledAction>action).disabled;
        return {
          ids: [ ...state.ids ],
          currentProjectId: state.currentProjectId,
          entities: state.entities,
          disabled: disabled
        };
      }
      default:
        return state;
    }
  };

export const getProjectsState = (state): ProjectsState => state.projects;

export const getProjectsEntities = createSelector(
  getProjectsState,
  ( state: ProjectsState ) => state.entities );

export const getAllProjects = createSelector(
  getProjectsEntities,
  ( entities: ProjectsEntities ) => Object.keys(entities)
    .map((projectId) => entities[projectId]));

export const getCurrentId = createSelector(
  getProjectsState,
  ( state: ProjectsState ) => state.currentProjectId);

export const getCurrentProject = createSelector(
  getProjectsState,
  ( state: ProjectsState ) => state.entities[state.currentProjectId]);
