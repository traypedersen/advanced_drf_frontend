import React, {Component} from 'react';
import { connect } from 'react-redux';
const axios = require('axios');


class UserInfoButton extends Component {

    constructor(props) {
        super(props);
        this.state = {
            email: '',
            name: '',
        };
    }

    handleUserInfo = (event) => {
        const userToken = 'Token ' + this.props.loginToken;
        axios.get('http://127.0.0.1:8000/api/user/me/', { 'headers': { 'Authorization': userToken } })
        .then( (response) => {
          this.setState({
            name: response.data.name,
            email: response.data.email,
          });
        })
        .catch( (error) => {
          console.log(error);
        });
    }

    render() {
        let userEmail = this.state.email;
        let userName = this.state.name;
        let userInfo;
        if(userEmail && userName) {
            userInfo = 'userEmail: ' + userEmail + ' userName: ' + userName;
        } else {
            userInfo = '';
        }
        return (
            <div>
                <div>
                    <button onClick={this.handleUserInfo} type="button">Show your user info.</button>
                </div>
                <div>
                    {userInfo}
                </div>
            </div>
        )
    }

}

const mapStateToProps = state => {
    return {
        loginToken: state.loginToken
    };
}

export default connect(mapStateToProps)(UserInfoButton);