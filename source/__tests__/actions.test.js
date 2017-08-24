import { Map, List, fromJS } from 'immutable';
import {
  ADD_TASK,
  MOVE_TASK,
  INDENT_TASK,
  OUTDENT_TASK,
  addTask,
  moveTask,
  indentTask,
  outdentTask,
} from '../js/actions/app';
import mainReducer from '../js/reducers/app';

const makeTask = (i, t, p = "", s = "", e = "") => {
  return Map({
    endDate: e,
    index: i,
    parent: p,
    startDate: s,
    task: t
  });
};

describe('actions', () => {
  it('should define the constants', () => {
    expect(ADD_TASK).toBe('ADD_TASK');
    expect(MOVE_TASK).toBe('MOVE_TASK');
    expect(INDENT_TASK).toBe('INDENT_TASK');
    expect(OUTDENT_TASK).toBe('OUTDENT_TASK');
  });

  it('should return the corresponding objects', () => {
    expect(addTask('test')).toEqual({type: ADD_TASK, task: 'test'});
    expect(moveTask(0, 1)).toEqual({type: MOVE_TASK, dragIndex: 0, hoverIndex: 1});
    expect(indentTask(0)).toEqual({type: INDENT_TASK, indent: 0});
    expect(outdentTask(0)).toEqual({type: OUTDENT_TASK, outdent: 0});
  });
});
