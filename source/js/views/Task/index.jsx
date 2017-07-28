import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { findDOMNode } from 'react-dom';
import { DragSource, DropTarget } from 'react-dnd';
import { ItemTypes } from 'Constants';

const taskSource = {
  beginDrag(props) {
    return {
      id: props.id,
      index: props.index,
      value: props.value,
    };
  },

  endDrag(props, monitor, component) {
    if (!monitor.didDrop()) {
      return;
    }

    const item = monitor.getItem();
    const dropResult = monitor.getDropResult();

    // This is a good place to call some Flux action
//    CardActions.moveCardToList(item.id, dropResult.listId);
  }
};

const taskTarget = {
  hover(props, monitor, component) {
    const dragIndex = monitor.getItem().index;
    const hoverIndex = props.index;

    // Don't replace items with themselves
    if (dragIndex === hoverIndex) {
      return;
    }

    // Determine rectangle on screen
    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();

    // Get vertical middle
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;

    // Determine mouse position
    const clientOffset = monitor.getClientOffset();

    // Get pixels to the top
    const hoverClientY = clientOffset.y - hoverBoundingRect.top;

    // Only perform the move when the mouse has crossed half of the items height
    // When dragging downwards, only move when the cursor is below 50%
    // When dragging upwards, only move when the cursor is above 50%

    // Dragging downwards
    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      return;
    }

    // Dragging upwards
    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      return;
    }

    // Time to actually perform the action
    props.moveTask(dragIndex, hoverIndex);

    // Note: we're mutating the monitor item here!
    // Generally it's better to avoid mutations,
    // but it's good here for the sake of performance
    // to avoid expensive index searches.
    monitor.getItem().index = hoverIndex;
  },
};

function dragCollect(connect, monitor) {
  return {
    connectDragSource: connect.dragSource(),
    isDragging: monitor.isDragging(),
  };
}

function dropCollect(connect, monitor) {
  return {
    connectDropTarget: connect.dropTarget(),
    isOver: monitor.isOver(),
    didDrop: monitor.didDrop(),
    getDropResult: monitor.getDropResult(),
  };
}

@DragSource(ItemTypes.TASK, taskSource, dragCollect)
@DropTarget(ItemTypes.TASK, taskTarget, dropCollect)
export default class Task extends Component {
  static propTypes = {
    value: PropTypes.object.isRequired,
    connectDragSource: PropTypes.func.isRequired,
    connectDropTarget: PropTypes.func.isRequired,
    isDragging: PropTypes.bool.isRequired,
  };

  render() {
    const {connectDragSource, connectDropTarget, isDragging} = this.props;
    const {index, value} = this.props;

    return connectDragSource(connectDropTarget(
        <div
          id={index}
          value={value}
        style={{
                          opacity: isDragging ? 0.5 : 1,
                          fontSize: 25,
                          fontWeight: 'bold',
                          cursor: 'move'}}
        className='singleTask'>
        <p>
          {value.task} {value.startDate} {value.endDate}
        </p>

      <hr />
      </div>));
  }
}
