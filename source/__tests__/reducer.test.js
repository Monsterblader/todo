import { Map, List, fromJS } from 'immutable';
import mainReducer from '../js/reducers';

describe('The main reducer', () => {
  it('should create add a task to the state when ADD_TASK is passed.', () => {
    const initialState = fromJS({taskList: []});
    expect(mainReducer(undefined, {
      type: 'ADD_TASK',
      task: Map({
        endDate: "",
        index: "0",
        parent: "",
        startDate: "",
        task: "1",
      })
    })).toEqual({app: fromJS({taskList: [{
      endDate: "",
      index: 0,
      parent: "",
      startDate: "",
      task: "1",
    }]})});
  });
});
