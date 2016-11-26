import React from 'react';
import {Link} from 'react-router';

var CustomNav = React.createClass({
    render: function() {
        let icon = this.props.avatar !== '' ? (
            <div className="collapse navbar-collapse" id="nightlife-menu">
                <ul className="nav navbar-nav navbar-right">
                    <li><h4 className="navbar-text">Signed is as {this.props.displayName}</h4></li>
                    <li><img src={this.props.avatar} className="img-circle icon"/></li>
                    <li><a href="/logout"><button className="btn btn-danger col-xs-12"><span className="fa fa-eject"/> Logout</button></a></li>
                </ul>
            </div>
        ) : (
            <div className="collapse navbar-collapse" id="nightlife-menu">
                <ul className="nav navbar-nav navbar-right">
                    <li><h4 className="navbar-text">Login or Register with:</h4></li>
                    <li><a href="/auth/twitter"><button className="btn btn-twitter col-xs-12"><span className="fa fa-twitter" alt="twitter logo"></span> Twitter</button></a></li>
                </ul>
            </div>
        );
        return (
          <nav id="custom-bootstrap-menu" className="navbar navbar-default navbar-static-top navbar-collapse" role="navigation">
            <div className="container-fluid">
              <div className="navbar-header"><Link className="navbar-brand" to="/">FCC Nightlife App</Link>
                <button 
                    type="button" 
                    className="navbar-toggle" 
                    data-toggle="collapse" 
                    data-target="#nightlife-menu"
                >
                    <span className="sr-only">Toggle navigation</span>
                    <span className="icon-bar" />
                    <span className="icon-bar" />
                    <span className="icon-bar" />
                </button>
              </div>
                {icon}
            </div>
          </nav>
        );
  }
});

module.exports = CustomNav;