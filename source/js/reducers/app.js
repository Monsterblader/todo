import {Map, List, fromJS} from 'immutable';

import {ADD_TASK, MOVE_TASK, INDENT_TASK, OUTDENT_TASK} from 'actions/app';

const initialState = fromJS({taskList: []});

const actionsMap = {
  [ADD_TASK]: (state, action) => {
    const taskListSize = state.get('taskList').size;
    const task = action.task.set('index', taskListSize);

    return state.setIn(['taskList', taskListSize], task);
  },
  [MOVE_TASK]: (state, action) => {
    const taskList = state.get('taskList');

    // Recalculate indent level in heirarchy.
    const setTaskParent = () => {
      if (action.hoverIndex === 0) {
        return "";
      }

      const parAbove = taskList.getIn([action.hoverIndex - 1, 'parent'], ''),
        parBelow = taskList.getIn([action.hoverIndex, 'parent'], '');

      return parBelow === action.hoverIndex - 1 ? parBelow : parAbove;
    };

    const dragTask = taskList.get(action.dragIndex).update('parent', setTaskParent);

    const newTaskList = taskList.delete(action.dragIndex)
      .insert(action.hoverIndex, dragTask)
      .map((value, key) => value.set('index', key));

    return state.set('taskList', newTaskList);
  },
  [INDENT_TASK]: (state, action) => {
    let targetIndex = action.indent - 1;
    const indentTask = state.getIn(['taskList', action.indent], '');
    let targetParent = state.getIn(['taskList', targetIndex, 'parent'], '');

    // Do not indent if task is already child of preceding task.
    if (indentTask.get('parent') === targetIndex) {
      return state;
    }

    // Find first preceding task that is at same level as selected task.
    while (indentTask.get('parent') !== targetParent) {
      targetIndex = targetParent;
      targetParent = state.getIn([targetIndex, 'parent'], '');
    }

    return state.setIn(['taskList', action.indent, 'parent'], targetIndex);
  },
  [OUTDENT_TASK]: (state, action) => {
    const outdent = action.outdent;
    const taskList = state.get('taskList');
    const task = taskList.get(outdent);
    const taskParent = task.get('parent');

    if (taskParent === '') {
      return state;
    }

    let checkIndex = outdent;
    const listLength = taskList.size;
    while (checkIndex < listLength && taskParent === taskList.getIn([checkIndex, 'parent'], '')) {
      checkIndex += 1;
    }
    const newTask = task.update('parent', parent => taskList.getIn([parent, 'parent'], ''));
    const newTaskList = taskList.delete(outdent)
      .insert(checkIndex - 1, newTask)
      .map((value, key) => value.set('index', key));

    return state.set('taskList', newTaskList);
  },
};

export default function reducer(state = initialState, action = {}) {
  const fn = actionsMap[action.type];
  return fn
    ? fn(state, action)
    : state;
}
