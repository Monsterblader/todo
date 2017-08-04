import { Map, List, fromJS } from 'immutable';
import mainReducer from '../js/reducers';

describe('The main reducer', () => {
  it('should create add a task to the state when ADD_TASK is passed.', () => {
    const initialState = fromJS({taskList: []});
    expect(mainReducer(undefined, fromJS({
      type: 'ADD_TASK',
      action: {
        endDate: "",
        index: "",
        parent: "",
        startDate: "",
        task: "",
      }
    }))).toBe(4);
  });
});
