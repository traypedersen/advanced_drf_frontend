import React, {Component} from 'react';
const axios = require('axios');


class UserInfoButton extends Component {

    constructor(props) {
        super(props);
    }

    handleUserInfo = (event) => {
        axios.get('http://127.0.0.1:8000/api/user/me/', { 'headers': { 'Authorization': 'Token d8d6f7dbc989b17c78bdf5549ae76fd4497ef08b' } })
        .then( (response) => {
          console.log(response.data);
        })
        .catch( (error) => {
          console.log(error);
        });
    }

    render() {
        return (
            <div>
                <button onClick={this.handleUserInfo} type="button">Show your user info.</button>
            </div>
        )
    }

}

export default UserInfoButton;