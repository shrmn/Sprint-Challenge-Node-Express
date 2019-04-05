import React, { Component } from 'react';
import axios from 'axios';

import Projects from './components/Projects'

import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      projects: []
    };
  };

  componentDidMount() {
    axios
      .get('http://localhost:6500/api/projects')
      .then((res => {
        this.setState({ projects: res.data })
      }))
  }
  render() {
    console.log(`state: `, this.state);
    return (
      <div className="App">
        <h1>Project Tracker</h1>
        <Projects
          projects={this.state.projects}
        />
      </div>
    );
  }
}

export default App;
