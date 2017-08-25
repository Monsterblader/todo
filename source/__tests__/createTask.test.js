import React from 'react';
import { shallow, mount, render } from 'enzyme';
import CreateTask from '../js/views/CreateTask';
import { fromJS } from 'immutable';
import renderer from 'react-test-renderer';

describe('CreateTask', () => {
  const passThroughFn = arg => arg,
    onSubmitEditingSpy = jest.fn(),
    mockValue = fromJS({id: 'a1', index: '0', task: 'task1', startDate: 'startDate1', endDate: 'endDate1'}),
    createTask = shallow(
      <CreateTask
        onSubmitEditing={onSubmitEditingSpy}
        placeholder="test"
      />
    );

  it('should render', () => {
    const createTask = renderer.create(
      <CreateTask
        onSubmitEditing={onSubmitEditingSpy}
        placeholder="test"
      />
    );
    expect(createTask).toMatchSnapshot();
  });

  it('should render with "task," "startDate," and "endDate"', () => {
    expect(createTask.find('input')).toHaveLength(3);
    expect(createTask.find('.enterTask')).toHaveLength(1);
    expect(createTask.find('.enterStartDate')).toHaveLength(1);
    expect(createTask.find('.enterEndDate')).toHaveLength(1);
  });

  it('should handle key presses and field changes', () => {
    const testEvent = {target: {name: 'task', value: 'a'}};
    createTask.instance().handleChange(testEvent);
    expect(createTask.instance().state.task).toEqual('a');
    // const changedTask = createTask.find('.enterTask').simulate('keypress', {key: 128});
    // expect(changedTask.find('.enterTask').html()).toEqual("purple");
  });
});
