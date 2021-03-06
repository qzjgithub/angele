/**
 * Created by admin on 2017/6/15.
 */
/* tslint:disable:typedef */

import {
  Reducer,
  combineReducers
} from 'redux';
import {ProjectsState, ProjectsReducer} from "./project/project.reducer";
import {CommonState, CommonReducer} from "./common/common.reducer";
import {ModulsState, ModulsReducer} from "./modul/modul.reducer";
import {InterfsState, InterfsReducer} from "./interf/interf.reducer";
import {IntdatasState, IntdatasReducer} from "./intdata/intdata.reducer";
export * from './project/project.reducer';

export interface AppState {
  projects: ProjectsState;
  moduls: ModulsState;
  interfs: InterfsState;
  intdatas: IntdatasState;
  common: CommonState;
}

const rootReducer: Reducer<AppState> = combineReducers<AppState>({
  projects: ProjectsReducer,
  moduls: ModulsReducer,
  interfs: InterfsReducer,
  intdatas: IntdatasReducer,
  common: CommonReducer
});

export default rootReducer;
