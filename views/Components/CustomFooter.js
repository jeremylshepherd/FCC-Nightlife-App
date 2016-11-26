import React from 'react';
import {Link} from 'react-router';

var CustomFooter = React.createClass({
  render: function() {
    return (
      <div id="custom-bootstrap-menu" className="navbar navbar-default navbar-fixed-bottom">
        <div className="container">
          <div className="navbar-header"><a className="navbar-brand" href="www.twitter.com/jeremylshepherd">@JeremyLShepherd</a>
          </div>
          <div className="nav navbar-nav navbar-right">
            <h4 className="navbar-text">...In partial completion of Backend Certification<span className="fa fa-fee-code-camp"/></h4>
          </div>
        </div>
      </div>
    );
  }
});

module.exports = CustomFooter;