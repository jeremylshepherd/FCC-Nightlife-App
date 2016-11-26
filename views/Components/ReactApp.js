var React = require("react"),
    Nav = require("./Nav"),
    CustomNav = require("./CustomNav"),
    CustomFooter = require("./CustomFooter"),
    Jumbotron = require("./Jumbotron"),
    SearchForm = require("./SearchForm"),
    Poll = require('./Poll'),
    InfoColumn = require("./InfoColumn"),
    PollForm = require("./PollForm"),
    Link = require('react-router').Link,
    $ = require("jquery");


var ReactApp = React.createClass({
    getInitialState: function() {
        return ({
            user: {},
            username: '',
        });
    },
    
    getUser: function() {
      $.ajax({
        url: '/api/me',
        dataType: 'json',
        cache: false,
        success: function(data) {
          this.setState({
              user: data,
              displayName: data.github.displayName,
              username: data.github.username,
              avatar: data.github.avatar,
              auth: true
            });
        }.bind(this),
        error: function(xhr, status, err) {
          console.error('/api/me', status, err.toString());
        }.bind(this)
      });
    },
    
    
    
    render: function() {
      
        return (
            <div>
                <CustomNav avatar={this.state.avatar}/>
                <Jumbotron displayName={this.state.displayName}/>
                <SearchForm />
                <CustomFooter />
            </div>
        );
    }
});

module.exports = ReactApp;