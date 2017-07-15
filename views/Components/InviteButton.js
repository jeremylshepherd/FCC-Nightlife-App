import React, { Component, } from 'react';

export default class InviteButton extends Component {
  constructor(props) {
    super(props);
    
    this.optIn = this.optIn.bind(this);
  }
  
  optIn(e) {
      this.props.go({venue: this.props.venue});
  }

  render() {
    return (<span className="btn btn-default" onClick={this.optIn}>{`${this.props.count} going`}</span>);
  }
}