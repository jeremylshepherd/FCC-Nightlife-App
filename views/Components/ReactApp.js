import React from "react";
import CustomNav from "./CustomNav";
import CustomFooter from "./CustomFooter";
import Jumbotron from "./Jumbotron";
import Bar from "./Bar";
import NoResults from "./NoResults";
import SearchForm from "./SearchForm";
import {Link} from 'react-router';
import $ from "jquery";


export default class ReactApp extends React.Component {
    constructor() {
        super();
        this.state = {
            user: {
                twitter: {
                    avatar: '',
                    displayName: ''
                }
            },
            zip: '45401',
            bars: [],
            searched: false,
            auth: false
        };
        
        this.getUser = this.getUser.bind(this);
        this.getBars = this.getBars.bind(this);
        this.handleSearch = this.handleSearch.bind(this);
        this.userGo = this.userGo.bind(this);
        this.userNotGo = this.userNotGo.bind(this);
    }
    
    getUser() {
      $.ajax({
        url: '/api/me',
        dataType: 'json',
        cache: false,
        success: function(data) {
          this.setState({
              user: data,
              auth: true
            });
        }.bind(this),
        error: function(xhr, status, err) {
          console.error('/api/me', status, err.toString());
        }.bind(this)
      });
    }
    
    getBars(zip) {
        $.ajax({
            url: '/api/bars/' + zip,
            dataType: 'json',
            cache: false,
            success: function(data) {
                if(!this.state.auth) {
                    window.localStorage.setItem('zip', zip);
                }else{
                    window.localStorage.removeItem('zip');
                }
                this.setState({
                  bars: data,
                  zip: zip,
                  searched: true
                });
            }.bind(this),
            error: function(xhr, status, err) {
              console.error('/api/bars/' + zip, status, err.toString());
            }.bind(this)
        });
    }
    
    handleSearch(num) {
        this.getBars(num);
    }
    
    userGo(venue) {
        venue.zip = this.state.zip;
        $.ajax({
          url: `/api/user/going`,
          dataType: 'json',
          type: 'POST',
          data: venue,
          success: function(data) {
              console.log(data);
              this.getBars(this.state.zip);
          }.bind(this),
          error: function(xhr, status, err) {
            console.error('/api/user/going', status, err.toString());
          }.bind(this)
        });
    }
    
    userNotGo(venue) {
        $.ajax({
          url: '/api/user/leave',
          dataType: 'json',
          type: 'POST',
          data: venue,
          success: function(data) {
              console.log(data);
              this.getBars(this.state.zip);
          }.bind(this),
          error: function(xhr, status, err) {
            console.error('/api/user/leave', status, err.toString());
          }.bind(this)
        });
    }
    
    componentDidMount() {
        let zip = window.localStorage.zip;
        console.log(zip);
        if(zip) {
            this.getBars(zip);
        }
        this.getUser();
    }
    
    render() {
        let bars = this.state.bars.map((bar, i) => {
            if(bar.price === undefined){
                bar.price = 0;
            } else {
                bar.price = bar.price;
            }
            return (
                <Bar key={i} {...bar} go={this.userGo} remove={this.userNotGo} zip={this.state.zip}/>
            );
        });
        let noRes = <NoResults zip={this.state.zip}/>;
        let init = <div className="container"><h2 className="center-block">Type in your Zip Code to began</h2></div>;
        let data = bars.length > 0 ? bars: this.state.searched ? noRes : init;
                    
        return (
            <div>
                <CustomNav 
                    avatar={this.state.user.twitter.avatar} 
                    displayName={this.state.user.twitter.displayName}/>
                <Jumbotron displayName={this.state.user.twitter.displayName}/>
                <SearchForm search={this.handleSearch}/>
                <div className="container">
                    {data}
                </div>
                <CustomFooter />
            </div>
        );
    }
}

module.exports = ReactApp;