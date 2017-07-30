import { Map, List } from 'immutable';

import {
ADD_TASK,
    MOVE_TASK,
    INDENT_TASK,
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

    const shortList = taskList.delete(action.dragIndex);
    const newTaskList = shortList.insert(action.hoverIndex, dragTask);
    const newState = state.set('taskList', newTaskList);

    return newState;
  },
  [INDENT_TASK]: (state, action) => {
    let targetIndex = action.indent - 1;
    const taskList = state.get('taskList');
    const indentTask = taskList.get(action.indent);
    let targetParent = taskList.get(targetIndex).parent;

    // Do not indent if task is already child of preceding task.
    if (indentTask.parent === targetIndex) {
      return state;
    }

    // Find first preceding task that is at same level as selected task.
    while (indentTask.parent !== targetParent) {
      targetindex = targetParent;
      targetParent = taskList.get(targetIndex).parent;
    }
    indentTask.parent = targetIndex;

    return state;
  }
};

export default function reducer(state = initialState, action = {}) {
  const fn = actionsMap[action.type];
  return fn ? fn(state, action) : state;
}
