import React, {Component} from 'react';
const axios = require('axios');


class Login extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            password: '',
            logginMessage: '',
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
            this.setState({ logginMessage: response.data.token})
        })
        .catch( (error) => {
            console.log(error)
        })

        event.preventDefault();
    }

    render() {
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
                <div>{this.state.logginMessage}</div>
            </div>
        )
    }

}

export default Login;