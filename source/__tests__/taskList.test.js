import React from 'react';
import { shallow, mount, render } from 'enzyme';
import { TaskList } from '../js/views/TaskList';
import TestBackend from 'react-dnd-test-backend';
import { DragDropContext } from 'react-dnd';
import { fromJS } from 'immutable';
import renderer from 'react-test-renderer';

const mockMoveTask = jest.fn(),
  mockIndentTask = jest.fn(),
  mockOutdentTask = jest.fn(),
  TaskListContext = DragDropContext(TestBackend)(TaskList);

describe('TaskList', () => {
  const mockTaskList = fromJS([
    {
      index: '0',
      parent: '',
      task: 'task1',
      startDate: 'startDate1',
      endDate: 'endDate1'
    }, {
      index: '1',
      parent: '',
      task: 'task2',
      startDate: 'startDate2',
      endDate: 'endDate2'
    }, {
      index: '2',
      parent: '',
      task: 'task3',
      startDate: 'startDate3',
      endDate: 'endDate3'
    }
  ]);

  it('should render', () => {
    const moveTaskSpy = jest.fn(),
      indentTaskSpy = jest.fn(),
      outdentTaskSpy = jest.fn(),
      taskList = renderer.create(
        <TaskListContext
          taskList={mockTaskList}
          moveTask={moveTaskSpy}
          indentTask={indentTaskSpy}
          outdentTask={outdentTaskSpy}
        />
      );

    expect(taskList).toMatchSnapshot();
  });

  it('should render a list of tasks', () => {
    const indentTaskSpy = jest.fn(),
      outdentTaskSpy = jest.fn(),
      taskList = shallow(
        <TaskListContext
          taskList={mockTaskList}
          indentTask={indentTaskSpy}
          outdentTask={outdentTaskSpy}
        />
      );

    expect(taskList.find('Task')).toHaveLength(3);
    // expect(createTask.find('.enterTask')).toHaveLength(1);
    // expect(createTask.find('.enterStartDate')).toHaveLength(1);
    // expect(createTask.find('.enterEndDate')).toHaveLength(1);
  });

  it.skip('should field changes', () => {
    const onSubmitEditingSpy = jest.fn(),
      testEvent = {target: {name: 'task', value: 'a'}},
      createTask = shallow(
        <CreateTask
          onSubmitEditing={onSubmitEditingSpy}
          placeholder="test"
        />
      );

    createTask.find('.enterTask').simulate('change', testEvent);
    expect(createTask.instance().state.task).toEqual('a');
    testEvent.target.value = 'b';
    createTask.instance().handleChange(testEvent);
    expect(createTask.instance().state.task).toEqual('b');
  });

  it.skip('should handle key presses', () => {
    const onSubmitEditingSpy = jest.fn(),
      testEvent = {target: {name: 'task', value: 'a'}},
      createTask = shallow(
        <CreateTask
          onSubmitEditing={onSubmitEditingSpy}
          placeholder="test"
        />
      );

    createTask.find('.enterTask').simulate('keypress', {key: 'alt'});
    expect(onSubmitEditingSpy).not.toBeCalled();
    createTask.find('.enterTask').simulate('keypress', {key: 'Enter'});
    expect(onSubmitEditingSpy).not.toBeCalled();

    createTask.find('.enterTask').simulate('change', testEvent);
    createTask.find('.enterTask').simulate('keypress', {key: 'Enter'});
    expect(onSubmitEditingSpy).lastCalledWith(fromJS({task: 'a', startDate: '', endDate: '', parent: '', index: ''}));
  });

  it.skip('should handle key presses', () => {
    const onSubmitEditingSpy = jest.fn(),
      testEvent = {target: { name: 'task', value: 'a' }},
      createTask = shallow(
        <CreateTask
          onSubmitEditing={onSubmitEditingSpy}
          placeholder="test"
        />
      );

    createTask.instance().handleKeyPress({ key: 'Alt' });
    expect(onSubmitEditingSpy).not.toBeCalled();

    createTask.instance().handleKeyPress({ key: 'Enter' });
    expect(onSubmitEditingSpy).not.toBeCalled();

    createTask.find('.enterTask').simulate('change', testEvent);
    createTask.find('.enterTask').simulate('keypress', { key: 'Enter' });
    expect(onSubmitEditingSpy).lastCalledWith(fromJS({ task: 'a', startDate: '', endDate: '', parent: '', index: '' }));
    expect(createTask.instance().state).toEqual({ endDate: '', index: '', parent: '', startDate: '', task: '' });
  });
});
