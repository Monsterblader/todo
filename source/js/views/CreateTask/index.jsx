import React, { Component } from "react";
import { Map } from 'immutable';

export default class CreateTask extends Component {
  state = {
    endDate: "",
    index: "",
    parent: "",
    startDate: "",
    task: "",
  };

  handleChange = e => {
    const target = e.target;
    const name = target.name;

    this.setState({ [name]: target.value });
  };

  handleKeyPress = e => {
    if (e.key !== "Enter")
      return;

    const { onSubmitEditing } = this.props;
    const { task, startDate, endDate } = this.state;

    if (!task)
      return; // Don't submit if empty

    onSubmitEditing(Map({ task, startDate, endDate, parent: "", index: "" }));
    this.setState({ endDate: "", index: "", parent: "", startDate: "", task: "" });
  };

  render() {
    const { placeholder } = this.props;
    const { task, startDate, endDate } = this.state;

    return (
      <div>
        <input name="task" className="enterTask" style={styles.input} type={"text"} value={task} placeholder={placeholder} onChange={this.handleChange} onKeyPress={this.handleKeyPress}/>
        <input name="startDate" className="enterStartDate" style={styles.input} type={"date"} value={startDate} placeholder={placeholder} onChange={this.handleChange} onKeyPress={this.handleKeyPress}/>
        <input name="endDate" className="enterEndDate" style={styles.input} type={"date"} value={endDate} placeholder={placeholder} onChange={this.handleChange} onKeyPress={this.handleKeyPress}/>
      </div>
    );
  }
}

const styles = {
  input: {
    fontSize: "100%",
    padding: 15,
    borderWidth: 0
  }
};
