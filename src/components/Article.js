import React from 'react';
import axios from 'axios';
import {Link} from 'react-router-dom';


// Article page itself
// STYLES IN index.css


class Article extends React.Component {
    constructor(props) {
        super(props);
        this.state ={
            article: [],
            author: [],
            category: '',
            date:'',
            isLoading: false,
            isLogged: false
        };
    }

    componentDidMount(){
        // console.log(this.props.isLogged);
        this.setState({isLoading: true, isLogged: this.props.isLogged});
        this.loadInfo();
    }

    // load all info
    loadInfo= () =>{
        // get article
        axios.get(`/articles/${this.props.match.params.article}`)
        .then(resArticle =>{
            // get the author
            axios.get(`/users/${resArticle.data.user_id}`)
            .then(resAuthor => {
                // get the category
                axios.get(`/categories/${resArticle.data.category_id}`)
                    .then(resCateg =>{
                        let dateFormat = new Date(resArticle.data.created_at);
                        let timeToShow = `${dateFormat.getHours()}:${dateFormat.getMinutes()<10 ? '0'+dateFormat.getMinutes():dateFormat.getMinutes()}`;
                        // additional options
                        let options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
                        // for setState
                        let date = {
                            'dateToShow': dateFormat.toLocaleDateString('fi-FI',options),
                            'timeToShow': timeToShow
                        }
                        // set loaded data to state
                        // setState causes updates so this updates content only once
                        this.setState({
                            article: resArticle.data,
                            author: resAuthor.data,
                            category: resCateg.data,
                            date,
                            isLoading:false
                        });
                    }).catch(err=>console.log(err))
            }).catch(err=>console.log(err));
        }).catch(err=>console.log(err));
    }

    delArticle = (e) =>{
        e.preventDefault();
        axios.delete(`/articles/${this.state.article.article_id}`)
        .then(res=>
            this.setState({
            article: []
        })).finally(
            this.loadInfo(),
            this.setState({
                article: []
            })
            );
    }

    render() {
        const {isLoading} = this.state;
        const {title,text} = this.state.article;
        const {firstname, lastname} = this.state.author;
        const {category_name} = this.state.category;
        const {dateToShow, timeToShow} = this.state.date;

        // If article is not loaded yet
        if(isLoading){
            
            // show this while loading content
            return(
                <React.Fragment>
                <div className='article'>

                </div>
            </React.Fragment>
            )
        }else if (!this.state.article.article_id){
            return (
                <React.Fragment>
                    <h1 className='notFound'>Artikkelia ei löydy</h1>
                </React.Fragment>
            )
        }else {
            return this.state.isLogged 
            ?
            <React.Fragment>
            <div className='articleWrapper'>
                <div className='article'>
                    <h2 className='articleHeader'>{title}</h2>
                    <p className='author'>Kirjoittanut: {firstname} {lastname}</p>
                    <p className='created'>Julkaistu {dateToShow} {timeToShow}</p>
                    <p className='category'>Kategoria: {category_name}</p>
                    <p className='articleText'>{text}</p>
                </div>
                <input type='button' value='Poista artikkeli' onClick={this.delArticle} className='delButton'></input>
            </div>
            </React.Fragment>
            : 
            <React.Fragment>
            <div className='articleWrapper'>
                <div className='article'>
                    <h2 className='articleHeader'>{title}</h2>
                    <p className='author'>Kirjoittanut: {firstname} {lastname}</p>
                    <p className='created'>Julkaistu {dateToShow} {timeToShow}</p>
                    <p className='category'>Kategoria: {category_name}</p>
                    <p className='articleText'>{text}</p>
                </div>
            </div>
            </React.Fragment>;
        }
        
    }
}


export default Article;
