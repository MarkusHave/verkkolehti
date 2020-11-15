import React from 'react';
import {Link} from 'react-router-dom';


// Component for front page
// STYLES IN index.css

class Article extends React.Component {
    constructor(props) {
        super(props);
        this.state ={
            article: [],
            date: '',
            time: '',
        };
    }

    componentDidMount(){

        // date and time from article 
        let dateFormat = new Date(this.props.article.created_at);
        //time with leading zero
        let timeToShow = `${dateFormat.getHours()}:${dateFormat.getMinutes()<10 ? '0'+dateFormat.getMinutes():dateFormat.getMinutes()}`  ;


        // date to json
        let date = {
            'dateToShow':  dateFormat.toLocaleDateString('fi-FI'),
            'timeToShow': timeToShow
        }

        // set date to article
        this.setState({
            date
        });
    }

    render() {
        // no need for 'this.' in code 
        const {title,text,article_id} = this.props.article;
        const {timeToShow, dateToShow} = this.state.date;

        // get 2 first sentences
        const desc = text.split('.', 2);

        return(
            <Link to={`/article/${article_id}`}>
                <div className='fpArticle'>
                    <h3 className='fpText'>{title}</h3>
                    <p className='fpText'>{desc[0]}. {desc[1]}.</p>
                    <p className='fpText'>{dateToShow} klo. {timeToShow}</p>
                </div>
            </Link>
        )
    }
}

export default Article;