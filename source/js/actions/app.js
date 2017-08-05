export const ADD_TASK = 'ADD_TASK';
export const MOVE_TASK = 'MOVE_TASK';
export const INDENT_TASK = 'INDENT_TASK';
export const OUTDENT_TASK = 'OUTDENT_TASK';

export function addTask(task) {
  return {type: ADD_TASK, task};
}

export function moveTask(dragIndex, hoverIndex) {
  return {type: MOVE_TASK, dragIndex, hoverIndex};
}

export function indentTask(indent) {
  return {type: INDENT_TASK, indent};
}

export function outdentTask(outdent) {
  return {type: OUTDENT_TASK, outdent};
}
