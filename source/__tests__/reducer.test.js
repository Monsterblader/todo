import { Map, List, fromJS } from 'immutable';
import { ADD_TASK, MOVE_TASK, INDENT_TASK } from '../js/actions/app';
import mainReducer from '../js/reducers/app';

const makeTask = (i, t, p, s, e) => {
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
    expect(mainReducer(undefined, {
      type: ADD_TASK,
      task: makeTask(0, "1")
    })).toEqual(fromJS({taskList: [
      makeTask(0, "1")
    ]}));

    const state = fromJS({taskList: [
      makeTask(0, "1")
    ]});

    expect(mainReducer(state, {
      type: ADD_TASK,
      task: makeTask(1, "2"),
    })).toEqual(fromJS({taskList: [
      makeTask(0, "1"),
      makeTask(1, "2"),
    ]}));
  });

  it('should reorder existing tasks when a MOVE_TASK is passed', () => {
    const state = fromJS({taskList: [
      makeTask(0, "1"),
      makeTask(1, "2"),
    ]});

    const expectedState = fromJS({taskList: [
      makeTask(1, "2"),
      makeTask(0, "1"),
    ]});

    expect(mainReducer(state, {
      type: MOVE_TASK,
      dragIndex: 1,
      hoverIndex: 0
    })).toEqual(expectedState);
  });

  it('should modify the list heirarchy when INDENT_TASK is passed', () => {
    const state = fromJS({taskList: [
      makeTask(0, "1"),
      makeTask(1, "2"),
      makeTask(2, "3"),
      makeTask(3, "4"),
      makeTask(4, "5"),
    ]});

    expect(mainReducer(state, {
      type: "INDENT_TASK",
      indent: 1,
      target: 0
    })).toEqual(fromJS({taskList: [
      makeTask(0, "1"),
      makeTask(1, "2", 0),
      makeTask(2, "3"),
      makeTask(3, "4"),
      makeTask(4, "5"),
    ]}));
  });
});
