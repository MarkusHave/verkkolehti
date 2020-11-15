import React from 'react';
import axios from 'axios';
const qs = require('querystring');
const bcrypt = require('bcryptjs');
// import {Link} from 'react-router-dom';


// Article page itself
// STYLES IN index.css


class Article extends React.Component {
    constructor(props) {
        super(props);
        this.state ={
            newEmailError: '',
            emailMatchError: '',
            emailsMatch: false,
            emailPassError: '',
            oldPassError: '',
            newPasswdError: '',
            passMatchError: '',
            passwdsMatch: false
        };
        this.checkEmail = this.checkEmail.bind(this);
        this.handleEmail = this.handleEmail.bind(this);
        this.changePassword = this.changePassword.bind(this);
        this.handlePassword = this.handlePassword.bind(this);
    }

    componentDidMount(){
        // this.loadComponent(this.props.user);
    }

    // debug
    // loadComponent = (user) =>{
    //     if(!user.user_id){
    //         console.log('Error in user handling');
    //     }else{
    //         console.log(user);
    //     }
    // }

    // Regex validation for email format
    validateEmail = (email) => {
        var re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    }

    // Email validation & match eachother
    handleEmail(e){
        e.preventDefault();
        if(!this.validateEmail(this.refs.txtNewEmail.value)){
            this.setState({
                newEmailError: 'Anna validi sähköposti'
            })
        }else{
            this.setState({
                newEmailError: ''
            })
        }
        if(this.refs.txtNewEmail.value === this.refs.txtNewEmail2.value){
            this.setState({
                emailMatchError: '',
                emailsMatch: true
            })
        }else{
            this.setState({
                emailMatchError: 'Sähköpostit eivät vastaa toisiaan',
                emailsMatch: false
            })
        }
    }

    // On email form submit
    checkEmail(e){
        e.preventDefault();

        let oldEmail = (this.props.user.email).toString().toLowerCase();
        let newEmail = (this.refs.txtNewEmail.value).toString().toLowerCase();


        if(this.refs.txtNewEmail.value && this.refs.txtNewEmail2.value && this.refs.emailPass){ // if fields are filled
            if(this.validateEmail(newEmail) && this.state.emailsMatch){ // if email is valid
                axios.get(`/users/${this.props.user.user_id}`) //get email from database
                .then(res=>{
                    let gotEmail = (res.data.email).toString().toLowerCase();
                    if(gotEmail === oldEmail){
                        bcrypt.compare(this.refs.emailPass.value, this.props.user.passwd, (err, isMatch) => {
                            if (err) throw err;
                            if (isMatch) {
                                this.updateEmail(newEmail)
                                this.setState({
                                    emailPassError: '',
                                    newEmailError: ''
                                })
                                this.refs.txtNewEmail.value = ''
                                this.refs.txtNewEmail2.value = ''
                                this.refs.emailPass.value = ''
                                return true;
                            } else {
                                this.setState({
                                    emailPassError: 'Väärä salasana'
                                })
                                return false;
                            }
                        });    
                        
                    }else{
                        console.log('Error getting user email');
                    }
                })
            }else{
                this.setState({
                    newEmailError: 'Sähköpostit eivät vastaa toisiaan'
                })
            }
        }else{
            alert('Täytä kaikki kentät');
        }
    }

    // Only update email if password is correct
    updateEmail = (email) =>{

        const requestBody = {
            firstname: this.props.user.firstname,
            lastname: this.props.user.lastname,
            email
        }

        const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }

        axios.put(`/users/${this.props.user.user_id}`,qs.stringify(requestBody),config)
        .then(alert('Sähköposti päivitetty'))
        .catch(err=>{
            console.log(err)
        });
    }


    handlePassword(e){
        e.preventDefault();
        if(this.refs.newPass.value === this.refs.newPass2.value){
            this.setState({
                passMatchError: '',
                passwdsMatch: true
            })
        }else{
            this.setState({
                passMatchError: 'Salasanat eivät vastaa toisiaan',
                passwdsMatch: false
            })
        }
    }

    // On password form submit
    changePassword(e){
        e.preventDefault();

        let oldPass = this.refs.oldPass.value;
        if(this.refs.oldPass.value && this.refs.newPass.value && this.refs.newPass2.value){ // if fields are filled
            if(this.state.passwdsMatch){
                axios.get(`/users/${this.props.user.user_id}`)
                .then(res => {
                    let gotPass = res.data.passwd
                    bcrypt.compare(oldPass, gotPass, (err, isMatch) => {
                        if (err) throw err;
                        if (isMatch) {
                            this.updatePass(this.refs.newPass.value)
                            this.setState({
                                oldPassError: '',
                                newPasswdError: ''
                            })
                            this.refs.oldPass.value = ''
                            this.refs.newPass.value = ''
                            this.refs.newPass2.value = ''
                            return true;
                        } else {
                            this.setState({
                                oldPassError: 'Väärä salasana'
                            })
                            return false;
                        }
                    });
                })
            }
        }else{
            alert('Täytä kaikki kentät');
        }
    }

    updatePass = (passwd) => {
        const requestBody = {
            firstname: this.props.user.firstname,
            lastname: this.props.user.lastname,
            passwd
        }

        const config = {
            headers: {
                'Content-Type': 'application/x-www-form-urlencoded'
            }
        }

        axios.put(`/users/${this.props.user.user_id}`,qs.stringify(requestBody),config)
        .then(alert('Salasana vaihdettu'))
        .catch(err=>{
            console.log(err)
        });
    }

    render() {
            return(
                <React.Fragment>
                <h2>Hei {this.props.user.firstname} {this.props.user.lastname}</h2>
                <div className='account'>
                    {/* Email form */}
                    <div className='emailForm'>
                        <form onSubmit={this.checkEmail}>
                        <h3>Vaihda sähköposti: </h3>
                        <div>
                            <label>Syötä uusi sähköposti</label><br/>
                            <input ref="txtNewEmail" type="text" /><br/>
                            <span className='error'>{this.state.newEmailError}</span>
                        </div>
                        <div>
                            <label>Syötä uusi sähköposti uudelleen</label><br/>
                            <input ref="txtNewEmail2" type="text" onInput={this.handleEmail}/><br/>
                            <span className='error'>{this.state.emailMatchError}</span>
                        </div>
                        <div>
                            <label>Syötä salasana</label><br/>
                            <input ref="emailPass" type="password"/><br/>
                            <span className='error'>{this.state.emailPassError}</span>
                        </div>
                        <div>
                            <input type="submit" value="Lähetä"/>
                        </div>
                        </form>
                    </div>

                    {/* Password form */}
                    <div className='passwdForm'>
                        <form onSubmit={this.changePassword}>
                        <h3>Vaihda salasana: </h3>
                        <div>
                            <label>Syötä vanha salasana</label><br/>
                            <input ref="oldPass" type="password"/><br/>
                            <span className='error'>{this.state.oldPassError}</span>

                        </div>
                        <div>
                            <label>Syötä uusi salasana</label><br/>
                            <input ref="newPass" type="password" onInput={this.handlePassword} /><br/>
                            <span className='error'>{this.state.newPasswdError}</span>
                        </div>
                        <div>
                            <label>Syötä uusi salasana uudelleen</label><br/>
                            <input ref="newPass2" type="password" onInput={this.handlePassword} /><br/>
                            <span className='error'>{this.state.passMatchError}</span>
                        </div>
                        <div>
                            <input type="submit" value="Send" />
                        </div>
                        </form>
                    </div>
                </div>
            </React.Fragment>
            )

    }
}


export default Article;
