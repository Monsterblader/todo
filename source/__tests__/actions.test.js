import { Map, List, fromJS } from 'immutable';
import { ADD_TASK, MOVE_TASK, INDENT_TASK, OUTDENT_TASK } from '../js/actions/app';
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

describe('The main reducer', () => {
  it('should add a task to the state when ADD_TASK is passed.', () => {
    expect(true).toEqual(false);
  });
});
