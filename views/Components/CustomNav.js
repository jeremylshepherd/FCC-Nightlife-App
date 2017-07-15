import React from 'react';
import {Link} from 'react-router';


export default class CustomNav extends React.Component {
    constructor(props) {
        super(props);
        
        this.auth = this.auth.bind(this);
    }
    
    auth() {
        
    }
    
    render() {
        let icon = this.props.avatar !== '' ? (
            <div className="collapse navbar-collapse" id="nightlife-menu">
                <ul className="nav navbar-nav navbar-right">
                    <li><h4 className="navbar-text col-xs-12 text-center">{this.props.displayName}</h4></li>
                    <li className="hidden-xs hidden-sm"><img src={this.props.avatar} className="img-square profile-image"/></li>
                    <li ><a href="/logout" className="btn btn-danger col-xs-12"><span className="fa fa-eject"/> Logout</a></li>
                </ul>
            </div>
        ) : (
            <div className="collapse navbar-collapse" id="nightlife-menu">
                <ul className="nav navbar-nav navbar-right">
                    <li><h4 className="navbar-text col-xs-12 text-center">Login or Register with:</h4></li>
                    <li><a href="/auth/twitter" className="btn btn-twitter col-xs-12"><span className="fa fa-twitter" alt="twitter logo"></span> Twitter</a></li>
                </ul>
            </div>
        );
        return (
          <nav id="custom-bootstrap-menu" className="navbar navbar-default navbar-static-top navbar-collapse" role="navigation">
            <div className="container">
              <div className="navbar-header"><Link className="navbar-brand" to="/">FCC Nightlife App</Link>
                <button 
                    type="button" 
                    className="navbar-toggle" 
                    data-toggle="collapse" 
                    data-target="#nightlife-menu"
                >
                    Menu
                </button>
              </div>
                {icon}
            </div>
          </nav>
        );
    }
}