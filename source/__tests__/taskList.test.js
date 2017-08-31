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
      taskList = mount(
        <TaskListContext
          taskList={mockTaskList}
          indentTask={indentTaskSpy}
          outdentTask={outdentTaskSpy}
        />
      );

    expect(taskList.find('Task')).toHaveLength(3);
  });
});
