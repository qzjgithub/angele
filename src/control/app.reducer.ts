/**
 * Created by admin on 2017/6/15.
 */
/* tslint:disable:typedef */

import {
  Reducer,
  combineReducers
} from 'redux';
import {ProjectsState, ProjectsReducer} from "./project/project.reducer";
export * from './project/project.reducer';

export interface AppState {
  projects: ProjectsState;
}

const rootReducer: Reducer<AppState> = combineReducers<AppState>({
  projects: ProjectsReducer
});

export default rootReducer;
