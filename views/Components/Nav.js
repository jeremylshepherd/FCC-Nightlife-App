var React = require("react"),
    Link = require("react-router").Link;

var Nav = React.createClass({
    render: function() {
        let icon = this.props.avatar !== '' ? (
            <div className="navbar-right">
                <h4 className="navbar-text">Signed is as {this.props.displayName}</h4>
                <img src={this.props.avatar} className="img-circle icon"/>
                <a href="/logout" className="btn btn-danger navbar-btn"><span className="fa fa-eject"/> Logout</a>
            </div>
        ) : (
            <div className="navbar-right">
                <h4 className="navbar-text">Login or Register with:</h4>
                <a href="/auth/twitter" className="btn btn-twitter"><span className="fa fa-twitter" alt="twitter logo"></span> Twitter</a>
            </div>
        );
        return (
            <nav className="navbar navbar-inverse">
              <div className="container">
                <h1 className="navbar-brand">
                    FCC Nightlife App
                </h1>
                <ul className="nav navbar-nav">
                    <li><Link to='/polls'>All Polls</Link></li>
                </ul>
                {icon}
              </div>
            </nav>
        );
    }
});

module.exports = Nav;