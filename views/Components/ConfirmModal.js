import React from 'react';

export default class ConfirmModal extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        return (
            <div className="modal fade" role="dialog" id={this.props.venue}>
                <div className="modal-dialog" role="document">
                  <div className="modal-content">
                    <div className="modal-header">
                      <button type="button" className="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">×</span></button>
                      <h4 className="modal-title">Confirm Change</h4>
                    </div>
                    <div className="modal-body">
                      <p>Are you certain you want to leave?</p>
                    </div>
                    <div className="modal-footer">              
                      <button type="button" className="btn btn-danger" onClick={this.props.out} data-dismiss="modal">YES</button>
                    </div>
                  </div>
                </div>
            </div>
        );
    }
}