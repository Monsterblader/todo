import { Map, List, fromJS } from 'immutable';
import mainReducer from '../js/reducers/app';

describe('The main reducer', () => {
  it('should add a task to the state when ADD_TASK is passed.', () => {
    expect(mainReducer(undefined, {
      type: 'ADD_TASK',
      task: Map({
        endDate: "",
        index: "0",
        parent: "",
        startDate: "",
        task: "1",
      })
    })).toEqual(fromJS({taskList: [{
      endDate: "",
      index: 0,
      parent: "",
      startDate: "",
      task: "1",
    }]}));

    const state = fromJS({taskList: [{
      endDate: "",
      index: 0,
      parent: "",
      startDate: "",
      task: "1",
    }]});

    expect(mainReducer(state, {
      type: 'ADD_TASK',
      task: Map({
        endDate: "",
        index: "1",
        parent: "",
        startDate: "",
        task: "2",
      })
    })).toEqual(fromJS({taskList: [{
      endDate: "",
      index: 0,
      parent: "",
      startDate: "",
      task: "1",
    }, {
      endDate: "",
      index: 1,
      parent: "",
      startDate: "",
      task: "2"
    }]}));
  });

  it('should reorder existing tasks when a task is moved', () => {
    const state = fromJS({taskList: [{
      endDate: "",
      index: 0,
      parent: "",
      startDate: "",
      task: "1",
    }, {
      endDate: "",
      index: 1,
      parent: "",
      startDate: "",
      task: "2",
    }]});

    const expectedState = fromJS({taskList: [{
      endDate: "",
      index: 1,
      parent: "",
      startDate: "",
      task: "2",
    }, {
      endDate: "",
      index: 0,
      parent: "",
      startDate: "",
      task: "1",
    }]});

    expect(mainReducer(state, {
      type: "MOVE_TASK",
      dragIndex: 1,
      hoverIndex: 0
    })).toEqual(expectedState);
  });
});
