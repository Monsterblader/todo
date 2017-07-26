import { Map, List } from 'immutable';

import {
  TEST_ACTION,
  TEST_ASYNC_ACTION_START,
  TEST_ASYNC_ACTION_ERROR,
    TEST_ASYNC_ACTION_SUCCESS,
    ADD_TASK,
} from 'actions/app';

const initialState = Map({
  counter: 0,
  asyncLoading: false,
  asyncError: null,
  asyncData: null,
  taskList: List(),
});

const actionsMap = {
  [TEST_ACTION]: (state) => {
    const counter = state.get('counter') + 1;

    return state.merge({
      counter,
    });
  },

  // Async action
  [TEST_ASYNC_ACTION_START]: (state) => {
    return state.merge({
      asyncLoading: true,
      asyncError: null,
    });
  },
  [TEST_ASYNC_ACTION_ERROR]: (state, action) => {
    return state.merge({
      asyncLoading: false,
      asyncError: action.data,
    });
  },
  [TEST_ASYNC_ACTION_SUCCESS]: (state, action) => {
    return state.merge({
      asyncLoading: false,
      asyncData: action.data,
    });
  },
  [ADD_TASK]: (state, action) => {
    const taskList = state.get('taskList');
    const newState = state.set('taskList', taskList.push(action.task));

    return newState;
  },
};

export default function reducer(state = initialState, action = {}) {
  const fn = actionsMap[action.type];
  return fn ? fn(state, action) : state;
}
