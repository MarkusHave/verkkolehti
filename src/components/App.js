import React from 'react';
import { BrowserRouter as Router, Route } from 'react-router-dom';
import axios from 'axios'
import ArticleFP from './ArticleFP';
import Article from './Article';
import Account from './Account';
import Login from './Login';
import LP from './LandingPage';
import Navbar from './Navbar';
import ArticleForm from './ArticleForm';
import Search from './Search';

class App extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            articles: [],
            passport: [],
            user: []
        };
    }

    componentDidMount() {
        // console.log('COMPONENT MOUNTED');
        this.getAllInfo(this);
        this.getLogin();
    }

    getAllInfo = () =>{
            axios.get('/articles')
            .then(resA => {
                this.setState({
                    articles: resA.data
                });
            });
    }

    getLogin = () =>{
        // console.log('onLogin called');
        axios.get('/cl')
            .then(res => {
                if(!res.data.passport){
                    // console.log('No session logon');
                    this.setState({
                        isLogged: false
                    })
                }else{
                    axios.get(`/users/${res.data.passport.user}`)
                        .then(resu =>{
                    if(resu.data.user_id){
                        this.setState({
                            user: resu.data,
                            isLogged: true
                        })
                    }else{
                        // console.log('No user got');
                        this.setState({
                            isLogged: false
                        })
                    }
                });
                }
                
            });
    }

    render() {
        // console.log('APP RENDERS');
        return (
            <Router>
                <div id="App">
                <Navbar isLogged={this.state.isLogged}/>
                
                    <Route exact path="/" render={(props) => (
                        <React.Fragment>
                            <h2>Uutiset</h2>
                            <Search />
                            {this.state.articles.sort((a,b) => parseFloat(b.article_id) - parseFloat(a.article_id)).map((item, index) => {
                                return (
                                    <div key={index}>
                                        <ArticleFP article={item}></ArticleFP>
                                    </div>
                                )
                            })}
                        </React.Fragment>
                    )} />
                    <Route exact path="/loggedin" render={(props) => <LP onLogin={this.getLogin} log={true} text='Olet kirjautunut sisään'/>}/>
                    <Route exact path="/loggedout" render={(props) => <LP text='Olet kirjautunut ulos'/>}/>
                    <Route exact path="/loginfirst" render={(props) => <LP text='Sinun täytyy ensin kirjautua sisään'/>}/>
                    <Route exact path='/new' component={ArticleForm} />
                    <Route exact path='/article/:article' render={(props) => <Article {...props} isLogged={this.state.isLogged}/>}/>
                    <Route exact path='/account' render={(props) => <Account {...props} isLogged={this.state.isLogged} user={this.state.user}/>}/>
                    <Route exact path='/auth/login' component={Login} />
                </div>
            </Router>
        )
    }
}

export default App;
