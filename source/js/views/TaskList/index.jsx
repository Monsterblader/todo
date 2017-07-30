import React, { Component } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Task from 'views/Task';

@connect(state => ({
taskList: state.app.get('taskList'),
    }))
export default class TaskList extends Component {
  static propTypes = {
    taskList: PropTypes.object,
  }

  render() {
    const {taskList, moveTask, indentTask} = this.props;

    return (
        <div className='taskList'>
          <p>
            Task list
          </p>

          <hr />

          <div className='Example'>
            {taskList.map((value, key) => <Task
              key={`task${key}`}
              id={value.id}
              index={key}
              value={value}
              moveTask={moveTask}
              indentTask={indentTask}
              />
                              )}
          </div>

        </div>
        );
  }
}

