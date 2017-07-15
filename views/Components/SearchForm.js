import React from 'react';

export default class SearchForm extends React.Component {
    constructor() {
        super();
        this.state = {
            searchInput: ''
        };
        
        this.handleSearchInput = this.handleSearchInput.bind(this);
        this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
    }
    
    handleSearchInput(e) {
        this.setState({searchInput: e.target.value});
    }

    handleSearchSubmit(e) {
        console.log('Search submit fired!');
        this.props.search(this.state.searchInput);
        this.setState({searchInput: ''});
    }
    
    render() {
        return (
            <div className="container">
                <div className="col-xs-12">
                    <div className="input-group">
                        <input type="text" className="form-control" placeholder="Where are you at?" value={this.state.searchInput} onChange={this.handleSearchInput}/>
                        <span className="input-group-btn">
                            <button className="btn btn-nightlife" type="button" onClick={this.handleSearchSubmit}>Search</button>
                        </span>
                    </div>
                </div>
            </div>
        );
    } 
}