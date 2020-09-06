import { combineReducers } from 'redux';
import { reducer } from './reducer';
import { AppState } from '../types/store';

export interface ApplicationState {
  app: AppState
}

export const createRootReducer = () => combineReducers({
  app: reducer
});
