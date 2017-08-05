import { Map, List, fromJS } from 'immutable';
import { ADD_TASK, MOVE_TASK, INDENT_TASK, OUTDENT_TASK } from '../js/actions/app';
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
    expect(mainReducer(fromJS({taskList: [
      makeTask(0, "1"),
      makeTask(1, "2"),
    ]}), {
      type: MOVE_TASK,
      dragIndex: 1,
      hoverIndex: 0
    })).toEqual(fromJS({taskList: [
      makeTask(0, "2"),
      makeTask(1, "1"),
    ]}));

    expect(mainReducer(fromJS({taskList: [
      makeTask(0, "1"),
      makeTask(1, "2", 0),
    ]}), {
      type: MOVE_TASK,
      dragIndex: 1,
      hoverIndex: 0
    })).toEqual(fromJS({taskList: [
      makeTask(0, "2"),
      makeTask(1, "1"),
    ]}));

    expect(mainReducer(fromJS({taskList: [
      makeTask(0, "1"),
      makeTask(1, "2", 0),
      makeTask(2, "3", 0),
      makeTask(3, "4"),
    ]}), {
      type: MOVE_TASK,
      dragIndex: 3,
      hoverIndex: 2
    })).toEqual(fromJS({taskList: [
      makeTask(0, "1"),
      makeTask(1, "2", 0),
      makeTask(2, "4", 0),
      makeTask(3, "3", 0),
    ]}));

    expect(mainReducer(fromJS({taskList: [
      makeTask(0, "1"),
      makeTask(1, "2", 0),
      makeTask(2, "3", 0),
      makeTask(3, "4"),
    ]}), {
      type: MOVE_TASK,
      dragIndex: 3,
      hoverIndex: 1
    })).toEqual(fromJS({taskList: [
      makeTask(0, "1"),
      makeTask(1, "4", 0),
      makeTask(2, "2", 0),
      makeTask(3, "3", 0),
    ]}));
  });

  it('should modify the list heirarchy when INDENT_TASK is passed', () => {
    expect(mainReducer(fromJS({taskList: [
        makeTask(0, "1"),
        makeTask(1, "2"),
      ]}), {
      type: INDENT_TASK,
      indent: 1,
    })).toEqual(fromJS({taskList: [
      makeTask(0, "1"),
      makeTask(1, "2", 0),
    ]}));

    expect(mainReducer(fromJS({taskList: [
      makeTask(0, "1"),
      makeTask(1, "2", 0),
    ]}), {
      type: INDENT_TASK,
      indent: 1,
    })).toEqual(fromJS({taskList: [
      makeTask(0, "1"),
      makeTask(1, "2", 0),
    ]}));

    expect(mainReducer(fromJS({taskList: [
      makeTask(0, "1"),
      makeTask(1, "2", 0),
      makeTask(2, "3")
    ]}), {
      type: INDENT_TASK,
      indent: 2,
    })).toEqual(fromJS({taskList: [
      makeTask(0, "1"),
      makeTask(1, "2", 0),
      makeTask(2, "3", 0),
    ]}));

    expect(mainReducer(fromJS({taskList: [
      makeTask(0, "1"),
      makeTask(1, "2", 0),
      makeTask(2, "3", 0),
    ]}), {
      type: INDENT_TASK,
      indent: 2,
    })).toEqual(fromJS({taskList: [
      makeTask(0, "1"),
      makeTask(1, "2", 0),
      makeTask(2, "3", 1),
    ]}));
  });

  xit('should modify they list heirarchy when OUTDENT_TASK is passed', () => {
    expect(mainReducer(fromJS({taskList: [
      makeTask(0, "1"),
      makeTask(1, "2"),
    ]}), {
      type: OUTDENT_TASK,
      outdent: 1,
    })).toEqual(fromJS({taskList: [
      makeTask(0, "1"),
      makeTask(1, "2"),
    ]}));

    expect(mainReducer(fromJS({taskList: [
      makeTask(0, "1"),
      makeTask(1, "2", 0),
    ]}), {
      type: OUTDENT_TASK,
      outdent: 1,
    })).toEqual(fromJS({taskList: [
      makeTask(0, "1"),
      makeTask(1, "2"),
    ]}));

    expect(mainReducer(fromJS({taskList: [
      makeTask(0, "1"),
      makeTask(1, "2", 0),
      makeTask(2, "3", 1),
    ]}), {
      type: OUTDENT_TASK,
      outdent: 1,
    })).toEqual(fromJS({taskList: [
      makeTask(0, "1"),
      makeTask(1, "2"),
      makeTask(2, "3", 1),
    ]}));

    expect(mainReducer(fromJS({taskList: [
      makeTask(0, "1"),
      makeTask(1, "2", 0),
      makeTask(2, "3", 1),
    ]}), {
      type: OUTDENT_TASK,
      outdent: 1,
    })).toEqual(fromJS({taskList: [
      makeTask(0, "1"),
      makeTask(1, "2", 0),
      makeTask(2, "3", 0),
    ]}));

    expect(mainReducer(fromJS({taskList: [
      makeTask(0, "1"),
      makeTask(1, "2", 0),
      makeTask(2, "3", 0),
    ]}), {
      type: OUTDENT_TASK,
      outdent: 1,
    })).toEqual(fromJS({taskList: [
      makeTask(0, "1"),
      makeTask(1, "2", 0),
      makeTask(2, "3"),
    ]}));

  });
});
