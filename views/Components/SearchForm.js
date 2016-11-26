import React from 'react';

var SearchForm =  React.createClass({
    getInitialState: function() {
        return ({
            searchInput: ''
        });
    },
    
    handleSearchInput: function(e) {
        this.setState({searchInput: e.target.value});
    },
    
    handleSearchSubmit: function(e) {
        console.log('Hoo Hoo!');
    },
    
    render: function() {
        return (
            <div className="container">
                <div className="row">
                    <div className="col-lg-12">
                        <div className="input-group">
                            <input type="text" className="form-control" placeholder="Where are you at?"  value={this.state.searchInput} onChange={this.handleSearchInput}/>
                            <span className="input-group-btn">
                                <button className="btn btn-primary" type="button" onClick={this.handleSearchSubmit}>Search</button>
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        );
    } 
});

module.exports = SearchForm;