import { Map, List } from 'immutable';

import {
ADD_TASK,
    MOVE_TASK,
} from 'actions/app';

const initialState = Map({
  taskList: List(),
});

const actionsMap = {
  [ADD_TASK]: (state, action) => {
    const taskList = state.get('taskList');
    const newState = state.set('taskList', taskList.push(action.task));

    return newState;
  },
  [MOVE_TASK]: (state, action) => {
    const taskList = state.get('taskList');
    const dragTask = taskList.get(action.dragIndex);

// This only works when dragging from higher index to lower index.
// Figure out how to handle reverse.
    const shortList = taskList.delete(action.dragIndex);
    const newTaskList = shortList.insert(action.hoverIndex, dragTask);

    const newState = state.set('taskList', newTaskList);

    return newState;
  }
};

export default function reducer(state = initialState, action = {}) {
  const fn = actionsMap[action.type];
  return fn ? fn(state, action) : state;
}
