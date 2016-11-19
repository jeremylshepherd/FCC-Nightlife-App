import React from "react";
import {Router, Route, Link}  from "react-router";
import $     from 'jquery';
import {rect, line, text} from "./ChartFunctions";
import BarChart from './BarChart';

let APP_URL = 'https://urt-voting-app-jeremylshepherd.c9users.io/';

var Poll = React.createClass({
    getInitialState: function() {
        return ({
            userId: '',
            id: this.props.id,
            owner: false,
            chart: true,
            option: this.props.poll.options[0].text,
            customOption: ''
        });
    },
    
    handleVote: function() {
        console.log('Vote started');
        let obj = {};
        obj.option = this.state.option;
        console.log(obj);
        $.ajax({
          url: '/api/vote/' + this.props.poll._id,
          dataType: 'json',
          type: 'POST',
          data: obj,
          success: function(data) {
              console.log('success');
              this.setState({option: this.props.poll.options[0].text});
              this.setState({customOption: ''});
          }.bind(this),
          error: function(xhr, status, err) {
            console.error('/api/vote/' + this.props.poll._id, status, err.toString());
          }.bind(this)
        });
        console.log('Vote ended');
    },
    
    getUser: function() {
        $.ajax({
          url: '/api/me',
          dataType: 'json',
          cache: false,
          success: function(data) {
              if(this.props.poll.author == data._id){
                this.setState({
                    owner: true,
                    userId: data._id
                });
              }
          }.bind(this),
          error: function(xhr, status, err) {
            console.error('/api/me', status, err.toString());
          }.bind(this)
        });
    },
    
    handleDelete: function() {
        this.props.del(this.props.poll._id);  
    },
    
    handleOption: function(e) {
        this.setState({option: e.target.value});
    },
    
    handleCustomInput: function(e) {
        this.setState({customOption: e.target.value});
    },
    
    cancelCustom: function() {
        this.setState({customOption: ''});
    },
    
    handleCustom: function() {
        this.setState({customOption: 'Custom Option'});
    },
    
    toggleChart: function() {
        this.setState({chart: this.state.chart ? false : true});
    },
    
    componentDidMount: function() {
        this.setState({option: this.props.poll.options[0].text});
        this.getUser();
    },
    
    componentDidUpdate: function() {
        this.getUser();
    },
    
    componentWillReceiveProps: function(newProps) {
        this.setState({option: newProps.poll.options[0].text});
    },
    
    render: function() {
        let optionNodes = this.props.poll.options.map((option, i) => {
            return (
                <li key={i}>{option.text}: {option.votes}</li>  
            );
        });
        let dataViz = this.state.chart ? 
            (<div className="dataViz col-xs-8" onClick={this.toggleChart}>
                <p className="text-center">Click to toggle Chart view</p>
                <BarChart className='center-block' poll={this.props.poll} width={600} height={300} margin={20}/>
            </div>) : 
            (<div className="dataViz col-xs-8" onClick={this.toggleChart}>
                <p className="text-center">Click to toggle Chart view</p>
                <ul>{optionNodes}</ul>
            </div>);
            
        let vote = this.props.poll.options.map((opt, i) => {
            return (
                <option key={i} value={opt.text}>{opt.text}</option>
            );
        });
        
        if(this.state.customOption){
            vote.push(<option key={vote.length} value={this.state.customOption}>{this.state.customOption}</option>);
        }
        //Delete button
        let delButton = this.state.owner ? 
            (<input id="del" type="button" className="col-xs-12 btn btn-danger" value="Delete" onClick={this.handleDelete}/>) : 
            (<input id="del" type="button" className="col-xs-12 btn btn-danger hidden" value="Delete"/>);
        //Custom option    
        let custom = this.state.customOption ? 
            (<div className="form-group"><input className="form-control col-xs-8" type="text" placeholder='Custom Option' value={this.state.customOption} onChange={this.handleCustomInput}/><span className="btn btn-danger col-xs-4" onClick={this.cancelCustom}>Cancel</span></div>) : 
            (<h5 onClick={this.handleCustom}>Click here to create your own option</h5>);
        
        //Twitter share button
            let tweetString = `https://twitter.com/intent/tweet?text=Hey, check out my new poll. ${this.props.poll.title}&url=${APP_URL}/poll/${this.props.poll._id}`;
            let tweet = encodeURI(tweetString);
        return (
            <div className="col-xs-12">
                <div className="panel panel-default">
                    <div className="panel-heading">
                        <Link to={`/poll/${this.props.poll._id}`}>
                            <h4 className="panel-title">{this.props.poll.title}</h4>
                        </Link>
                    </div>
                    <div className="panel-body">
                        <div className="row">
                            <div className="col-xs-3">
                                {custom}
                                <select className="col-xs-12" ref="select" onChange={this.handleOption}>
                                    {vote}
                                </select>
                            </div>
                            {dataViz}
                        </div>
                        <div className="row">
                            <div className="col-xs-3">
                                <input id="vote" type="button" className="col-xs-12 btn btn-primary" value="Vote" onClick={this.handleVote}/>
                                <a href={tweet} className="col-xs-12 btn btn-twitter "><span className="fa fa-twitter-square" alt="twitter logo"></span> Twitter</a>
                            </div>
                            <div className="col-xs-8">
                                {delButton}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        );
    }
});

module.exports = Poll;