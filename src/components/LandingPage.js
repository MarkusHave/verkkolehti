import React, { Component } from 'react';
import { Redirect } from 'react-router-dom';

export default class Loggedo extends Component {
    state = {
        redirect: false
    }

    // TODO:
    // see url where user is coming from

    componentDidMount() {
        this.id = setTimeout(() => this.setState({ redirect: true }), 2000)
    }

    componentWillUnmount() {
        if(this.props.log){
            this.props.onLogin();
        }
        clearTimeout(this.id)
    }

    render() {
        return this.state.redirect
        ? <Redirect to="/" />
        : <h2>{this.props.text}</h2>
    }
}