import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import Task from './task';

class App extends Component {
  constructor(props) {
    super(props);


    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  

    state = {tasks: [], changed:''};
 

  handleSubmit(event) {
    event.preventDefault();
    let values =this.state.tasks;
    values.push(this.state.changed);
    this.setState({tasks: values});

  }

  handleChange(event){
    this.setState({changed: event.target.value});
  }

  render() {
    return (
      <React.Fragment>
      <form onSubmit={this.handleSubmit}>
        <label>
          Task:
          <input type="text" value={this.state.changed} onChange={this.handleChange} />
        </label>
        <input type="submit" value="Submit" />
      </form>
      <ul>
  
      {this.state.tasks.map( (name) => <Task value={name}/>)}
      </ul>
       

      </React.Fragment>
    );
  }
}

export default App;
