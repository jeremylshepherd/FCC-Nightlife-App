import React from 'react';

export default class NoResults extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        return (
            <div className="col-xs-12 panel">
                <h3 className="panel-heading">{`No results within 15 miles of ${this.props.zip}`}</h3>
                <div className="panel-body">
                    <h3>Please try another location</h3>
                </div>
            </div>
        );
    }
}