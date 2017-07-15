import React from 'react';
import GoingButton from './GoingButton';
import InviteButton from './InviteButton';

export default class Bar extends React.Component {
    constructor(props) {
        super(props);
    }
    
    render() {
        let price;
        switch(+this.props.price) {
            case 0:
                price = <span>No price information available</span>;
                break;
            case 1:
                price = <span><i className="fa fa-glass"/></span>;
                break;
            case 2:
                price = <span><i className="fa fa-glass"/><i className="fa fa-glass"/></span>;
                break;
            case 3:
                price = <span><i className="fa fa-glass"/><i className="fa fa-glass"/><i className="fa fa-glass"/></span>;
                break; 
            case 4:
                price = <span><i className="fa fa-glass"/><i className="fa fa-glass"/><i className="fa fa-glass"/><i className="fa fa-glass"/></span>;
                break;
        }
        let count = this.props.going.length;
        let buttonGroup = this.props.attending ?
            (<GoingButton 
                className="pull-right" 
                remove={this.props.remove} 
                count={count} 
                venue={this.props.place_id} />) : 
            (<InviteButton 
                className="pull-right" 
                count={count} 
                go={this.props.go} 
                venue={this.props.place_id} />);
        let button = this.props.auth ? buttonGroup : <div></div>;
        return (
            <div className="col-xs-12">
                <div className="panel panel-info">
                    <div className="panel-heading"><span>{this.props.name}</span></div>
                    <div className="panel-body">
                        <div className="col-xs-10">
                            <h4>Price: {price}</h4>
                            <h4>{`Rating: ${this.props.rating}`}</h4>
                            <h4>{`Address: ${this.props.address}`}</h4>
                        </div>
                        <div className="col-xs-2">
                            {button}
                        </div>
                    </div>
                </div>
           </div>
        );
    }
}