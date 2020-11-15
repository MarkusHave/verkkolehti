import React from 'react';
//import {Link} from 'react-router-dom';

// Component for front page
// STYLES IN index.css

class Article extends React.Component {
    componentDidMount() {}

    render() {
        return (
            <div className="loginPage">
                <h1 className="loginHeader">Kirjaudu sisään</h1>
                <p className="loginText">Syötä tunnukset</p>
                <form action="/auth" method="post">
                    <div>
                        <label>Sähköposti: </label>
                    </div>
                    <input type="text" name="email" />
                    <div>
                        <label>Salasana: </label>
                    </div>
                    <input type="password" name="password" />
                    <div>
                        <br/>
                        <input type="submit" value="Kirjaudu sisään" />
                    </div>
                </form>
            </div>
        );
    }
}

export default Article;
