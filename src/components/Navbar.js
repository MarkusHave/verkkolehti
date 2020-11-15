import React from 'react';
import { Link } from 'react-router-dom';


class Navbar extends React.Component {
    render() {
        // return this.state.redirect ? <Redirect to="/" />: <h2>Olet kirjautunut sisään</h2>
        return this.props.isLogged ?
            <div id="navbar">
                <div className='linksDiv'>
                    <h1> Verkkolehti </h1>
                    {/* <Link className='navbarLinks' to='/'>Etusivu | </Link> */}
                    {/* OPTIONAL: 
                        a tags to prevent seeing deleted news when navigating from article 
                        (deleted articles stay in state as long as there's no page refresh) 
                    */}
                    <a className='navbarLinks' href='/'>Etusivu | </a>
                    <Link className='navbarLinks' to='/new'>Uusi artikkeli | </Link>
                    <Link className='navbarLinks' to='/account'>Käyttäjätili | </Link>
                    <a className='navbarLinks' href='/logout'>Kirjaudu ulos</a>
                </div>
            </div>
        :<div id="navbar">
            <h1> Verkkolehti </h1>
                <div className='linksDiv'>
                    <a className='navbarLinks' href='/'>Etusivu | </a>
                    <Link className='navbarLinks' to='/auth/login'>Kirjaudu sisään</Link>
                </div>
        </div>;

    }
}

export default Navbar;
