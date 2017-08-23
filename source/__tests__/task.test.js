import React from 'react';
import { shallow, mount, render } from 'enzyme';
import { Task } from '../js/views/task';
import { fromJS } from 'immutable';
import renderer from 'react-test-renderer';

describe('Item', () => {
  const passThroughFn = arg => arg,
    indentSpy = jest.fn(),
    outdentSpy = jest.fn(),
    mockValue = fromJS({id: 'a1', index: '0', task: 'task1', startDate: 'startDate1', endDate: 'endDate1'}),
    task = shallow(
      <Task
        index={mockValue.get('index')}
        value={mockValue}
        connectDragSource={passThroughFn}
        connectDropTarget={passThroughFn}
        indentTask={indentSpy}
        outdentTask={outdentSpy}
      />
    );

  it('should render', () => {
    const task = renderer.create(
    <Task index={mockValue.get('index')} value={mockValue}
      connectDragSource={passThroughFn}
      connectDropTarget={passThroughFn}
      indentTask={indentSpy} />
    );
    expect(task).toMatchSnapshot();
  });

  it('should render with "task," "startDate," and "endDate"', () => {
    expect(task.find('#0')).toHaveLength(1);
    expect(task.text().search('task1')).toBeGreaterThan(-1);
    expect(task.text().search('startDate1')).toBeGreaterThan(-1);
    expect(task.text().search('endDate1')).toBeGreaterThan(-1);
  });

  it('should be able to indent', () => {
    const indentTask = task.find('.indentTask');
    expect(indentTask).toHaveLength(1);
    indentTask.simulate('click');
    expect(indentSpy.mock.calls[0]).toEqual(['0']);
  });

  it('should be able to outdent', () => {
    const outdentTask = task.find('.outdentTask');
    expect(outdentTask).toHaveLength(1);
    outdentTask.simulate('click');
    expect(outdentSpy.mock.calls[0]).toEqual(['0']);
  });
});
