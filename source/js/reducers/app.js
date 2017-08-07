import {Map, List, fromJS} from 'immutable';

import {ADD_TASK, MOVE_TASK, INDENT_TASK, OUTDENT_TASK} from 'actions/app';

const initialState = fromJS({taskList: []});

const actionsMap = {
  [ADD_TASK]: (state, action) => {
    const taskList = state.get('taskList');
    const task = action.task.update('index', () => taskList.size);
    const newState = state.set('taskList', taskList.push(task));

    return newState;
  },
  [MOVE_TASK]: (state, action) => {
    const taskList = state.get('taskList');

    // Recalculate indent level in heirarchy.
    const setTaskParent = () => {
      if (action.hoverIndex === 0) {
        return null;
      }

      const taskAbove = taskList.get(action.hoverIndex - 1),
        taskBelow = taskList.get(action.hoverIndex);

      const parAbove = taskAbove ? taskAbove.get('parent') : null,
        parBelow = taskBelow ? taskBelow.get('parent') : null;

      return parBelow === action.hoverIndex - 1 ? parBelow : parAbove;
    };

    const dragTask = taskList.get(action.dragIndex).update('parent', setTaskParent);

    const newTaskList = taskList.delete(action.dragIndex)
      .insert(action.hoverIndex, dragTask)
      .map((value, key) => value.update('index', () => key));
    const newState = state.set('taskList', newTaskList);
    return newState;
  },
  [INDENT_TASK]: (state, action) => {
    let targetIndex = action.indent - 1;
    const taskList = state.get('taskList');
    const indentTask = taskList.get(action.indent);
    let targetParent = taskList.get(targetIndex).get('parent');

    // Do not indent if task is already child of preceding task.
    if (indentTask.get('parent') === targetIndex) {
      return state;
    }

    // Find first preceding task that is at same level as selected task.
    while (indentTask.get('parent') !== targetParent) {
      targetIndex = targetParent;
      targetParent = taskList.get(targetIndex).get('parent');
    }
    const newTask = indentTask.update('parent', () => targetIndex);
    const newTaskList = taskList.update(action.indent, () => newTask);
    const newState = state.set('taskList', newTaskList);

    return newState;
  },
  [OUTDENT_TASK]: (state, action) => {
    const taskList = state.get('taskList');
    const task = taskList.get(action.outdent);
    const taskParent = task.get('parent');

    if (task.get('parent') === null) {
      return state;
    }

    let checkIndex = action.outdent;
    const listLength = taskList.size;
    while (checkIndex < listLength && taskParent === taskList.get(checkIndex).get('parent')) {
      checkIndex += 1;
    }
    const newTask = task.update('parent', (parent) => {
      const parentTask = taskList.get(parent);
      return parentTask.get('parent');
    })
    const newTaskList = taskList.delete(action.outdent)
      .insert(checkIndex - 1, newTask)
      .map((value, key) => value.update('index', () => key));

    return state.update('taskList', () => newTaskList);
  },
};

export default function reducer(state = initialState, action = {}) {
  const fn = actionsMap[action.type];
  return fn
    ? fn(state, action)
    : state;
}
