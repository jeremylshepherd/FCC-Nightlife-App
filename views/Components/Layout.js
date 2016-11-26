import React from 'react';
import Nav from './Nav';
import Footer from './Footer';
import Jumbotron from './Jumbotron';

var Layout = React.createClass({
   render: function() {
       return (
            <div className="container">
                <Nav />
                <Jumbotron />
                <Footer />
            </div>
       )
   } 
});

module.exports = Layout;