import React, {Component} from 'react';
import PropTypes from 'prop-types';
import HTML5Backend from 'react-dnd-html5-backend';
import {DragDropContext} from 'react-dnd';

import {
  addTask,
  moveTask,
  indentTask,
  outdentTask
} from 'actions/app';

import CreateTask from 'views/CreateTask';
import TaskList from 'views/TaskList';

@DragDropContext(HTML5Backend)
export default class App extends Component {
  static propTypes = {
    children: PropTypes.object
  };

  onAddTask = task => {
    const { dispatch } = this.props.store;

    this.dispatch(addTask(task));
  };

  onMoveTask = (dragTask, hoverTask) => {
    const { dispatch } = this.props.store;

    this.dispatch(moveTask(dragTask, hoverTask));
  };

  onIndentTask = (indent, target) => {
    const { dispatch } = this.props.store;

    this.dispatch(indentTask(indent, target));
  };

  onOutdentTask = (outdent, target) => {
    const { dispatch } = this.props.store;

    this.dispatch(outdentTask(outdent, target));
  };

  render() {
    return (
      <div className='App'>
        <CreateTask
          onSubmitEditing={this.onAddTask}
          placeholder="Task description"
        />
        <TaskList
          moveTask={this.onMoveTask}
          indentTask={this.onIndentTask}
          outdentTask={this.onOutdentTask}
        />
      </div>
    );
  }
}
