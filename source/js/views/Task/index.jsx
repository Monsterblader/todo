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

    if (dragIndex === hoverIndex) {
      return;
    }

    const hoverBoundingRect = findDOMNode(component).getBoundingClientRect();
    const hoverMiddleY = (hoverBoundingRect.bottom - hoverBoundingRect.top) / 2;
    const clientOffset = monitor.getClientOffset();
    const hoverClientY = clientOffset.y - hoverBoundingRect.top;

    if (dragIndex < hoverIndex && hoverClientY < hoverMiddleY) {
      return;
    }

    if (dragIndex > hoverIndex && hoverClientY > hoverMiddleY) {
      return;
    }

    props.moveTask(dragIndex, hoverIndex);
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
    isDragging: PropTypes.bool,
  };

  render() {
    const {connectDragSource, connectDropTarget, isDragging, indentTask} = this.props;
    const {index, value} = this.props;

    const handleIndent = () => {
      const source = this.props.index;

      indentTask(source);
    }
    ;

    /* render sub-tasks */
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
          {index !== 0 && <div>Outdent</div>}
          {index !== 0 && <div onClick={handleIndent}>Indent</div>}
          <p>
          {value.task} {value.startDate} {value.endDate}
          </p>

          <hr />
      </div>));
  }
}
