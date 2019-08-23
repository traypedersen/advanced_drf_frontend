import React, {Component} from 'react';
import * as actionTypes from '../Store/actions';
import UserInfoButton from '../UserInfoButton/UserInfoButton';
import { connect } from 'react-redux';
const axios = require('axios');


class Login extends Component {

    constructor(props) {
        super(props);

        this.state = {
            email: '',
            password: '',
        };
    }

    handleChange = (event) => {
        const target = event.target;
        const value = target.value;
        const name = target.name;
        this.setState({
            [name]: value
        })
    }

    handleLogin = (event) => {
        axios.post('http://127.0.0.1:8000/api/user/token/', {
            email: this.state.email,
            password: this.state.password,
        }).then( (response) => {
            this.props.onUserLogin(response.data.token);
        })
        .catch( (error) => {
            console.log(error)
        })

        event.preventDefault();
    }

    render() {
        const isLoggedIn = this.props.loginToken;
        let userButton;

        if(isLoggedIn) {
            userButton = <UserInfoButton/>
        } else {
            userButton = "";
        }

        return (
            <div>
                <form onSubmit={this.handleLogin}>
                    Email:<br/>
                    <input type="text" value={this.state.email} onChange={this.handleChange} name="email"/><br/>
                    Password:<br/>
                    <input type="password" value={this.state.password} onChange={this.handleChange} name="password"/><br/>
                    <br/>
                    <input type="submit" value="Submit"></input>
                </form>
                <div>{this.props.loginToken}</div>
                <br/>
                <div>{userButton}</div>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        loginToken: state.loginToken
    };
}

const mapDispatchToProps = dispatch => {
    return {
        onUserLogin: (userToken) => dispatch( { type: actionTypes.USER_LOGIN_ACTION, loginToken: userToken } ),
    };
}

export default connect(mapStateToProps,mapDispatchToProps)(Login);
