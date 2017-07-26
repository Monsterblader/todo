import React, { Component } from 'react';
import PropTypes from 'prop-types';

export default class Task extends Component {
  static propTypes = {
    value: PropTypes.object,
  }

  render() {
    const {value} = this.props;

    return (
        <div className='singleTask'>
          <p>
            {value.task} {value.startDate} {value.endDate}
          </p>

        <hr />
        </div>
    );
  }
}
