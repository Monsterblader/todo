import React, {Component} from 'react';
import {connect} from 'react-redux';
import PropTypes from 'prop-types';
import Task from 'views/Task';

@connect(state => ({taskList: state.app.get('taskList')}))
export default class TaskList extends Component {
  static propTypes = {
    taskList: PropTypes.object
  }

  render() {
    const {taskList, moveTask, indentTask} = this.props;

    return (
      <div className='taskList'>
        <p>
          Task list
        </p>

        <hr/>

        <div className='Example'>
          {taskList.filter(value => value.get('parent') === "").map((value, key) => <Task key={`task${key}`} id={value.id} index={value.get('index')} value={value} moveTask={moveTask} indentTask={indentTask}/>)}
        </div>

      </div>
    );
  }
}
