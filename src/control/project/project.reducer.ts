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
};

const initialState: ProjectsState = {
  ids: [],
  currentProjectId: null,
  entities: {}
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
          entities: Object.assign({}, state.entities, entities)
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
