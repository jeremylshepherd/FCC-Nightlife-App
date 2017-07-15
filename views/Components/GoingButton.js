import React, { Component, } from 'react';
import ConfirmModal from './ConfirmModal';

export default class GoingButton extends Component {
  constructor(props) {
    super(props);
    
    this.optOut = this.optOut.bind(this);
  }
  
  optOut(e) {
      this.props.remove({venue: this.props.venue});
  }

  render() {
    return (
        <div>
          <span className="btn btn-success" data-toggle="modal" data-target={`#${this.props.venue}`}>{`You & ${this.props.count - 1} Going`}</span>
          <ConfirmModal out={this.optOut} venue={this.props.venue}/>
        </div>
      );
  }
}