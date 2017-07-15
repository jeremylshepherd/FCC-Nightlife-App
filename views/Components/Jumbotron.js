var React = require("react");

var Jumbotron = React.createClass({
    render: function() {
        var user = this.props.displayName ? "Hello, " + this.props.displayName : "Plans Tonight?";
        var greeting;
            if(this.props.displayName) {
                greeting = (
                    <div>
                        <p>
                            <i className="fa fa-map-marker fa-5x" aria-hidden="true"></i>
                            <i className="fa fa-glass fa-5x" aria-hidden="true"></i>
                            <i className="fa fa-taxi fa-5x" aria-hidden="true"></i>
                        </p>
                        <h3>Welcome back! Let's find a great place to meet with friends!</h3>
                        <p>Remember: take a cab and drink responsibly.</p>
                    </div>
                    );
            }else{
                greeting = (
                    <div>
                        <p>
                            <i className="fa fa-map-marker fa-5x" aria-hidden="true"></i>
                            <i className="fa fa-glass fa-5x" aria-hidden="true"></i>
                            <i className="fa fa-taxi fa-5x" aria-hidden="true"></i>
                        </p>
                        <h3>See which bars are hoppin' tonight and RSVP ahead of time!</h3>
                        <p>Remember: take a cab and drink responsibly.</p>
                    </div>
                );
            }
        
        return (
            <div className="container">
                <div className="jumbotron text-center">
                    <h1><span className="fa fa-user"></span> {user}</h1>
                    {greeting}
                </div>
            </div>
            
        );
    }
});

module.exports = Jumbotron;