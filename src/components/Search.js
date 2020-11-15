import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';

class Search extends React.Component {
    constructor(props) {
        super(props);
        this.state ={
            searchTerm: '',
            articles: []
        };
        this.handleChange = this.handleChange.bind(this);
        // this.handleSearchSubmit = this.handleSearchSubmit.bind(this);
    }

    handleChange(e){
        e.preventDefault();
        const searchTerm = this.refs.search.value;
        // console.log(this.refs.search.value);
        if(searchTerm.length > 3){
            // console.log('Enempi kuin 3');
            this.handleSearch(searchTerm);
        }
    }

    handleSearch = (searchTerm) => {
        axios.get(`/articles/param/${searchTerm}`)
            .then(res => {
                // console.log(res.data);
                this.setState({
                    articles: res.data
                })
            }).finally(

            )
    }

    showResults = () => {
        return 'huutista'
    }

    render() {
        return (
            <div>
                <div>
                <span>Haku: </span>
                <input type="text" ref="search" onInput={this.handleChange} placeholder="Etsi otsikon perusteella..." className='searchField'/>
            </div>
            <div>
                <span className='searchContainer'>{this.state.articles.map((item, index) => {
                    // console.log(item);
                return <div className='searchResult'><Link to={`/article/${item.article_id}`} className='searchLink' key={index}>{item.title}</Link></div>
                // return <Link to={`/article/${item.article_id}`} className='searchLink'>{item.title}</Link>
                })}</span>
            </div>
            </div>
            
        )
    }
}

export default Search;
