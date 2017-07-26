import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { addTask } from 'actions/app';

import CreateTask from 'views/CreateTask';
import TaskList from 'views/TaskList';

export default class App extends Component {
  static propTypes = {
    children: PropTypes.object,
  }

  onAddTask = (task) => {
    const {dispatch} = this.props.store;

    dispatch(addTask(task));
  }

  render() {
    return (
        <div className='App'>
          <CreateTask onSubmitEditing={this.onAddTask} placeholder="Task description"/>
          <TaskList />
        </div>
        );
  }
}
