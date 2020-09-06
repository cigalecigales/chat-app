import { Store, createStore, applyMiddleware } from 'redux';
import {  ApplicationState, createRootReducer } from './store';
import { websocketMiddleware } from './store/middleware';

export default function configureStore(initialState: ApplicationState): Store<ApplicationState> {
  const store = createStore(
    createRootReducer(),
    initialState,
    applyMiddleware(websocketMiddleware)
  );
  return store;
}
