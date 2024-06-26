import React, { Component } from 'react';
import './Clock.scss';

export default class Clock extends Component {
  state = {
    time: new Date().toLocaleTimeString(),
  };

  intervalId = null;

  componentDidMount() {
    console.log('setInteval');

    this.intervalId = setInterval(
      () => this.setState({ time: new Date().toLocaleTimeString() }),
      1000
    );
  }
  render() {
    return <div className="Clock__face">{this.state.time}</div>;
  }
}
