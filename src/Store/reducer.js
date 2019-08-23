import * as actionTypes from './actions';

const initialState = {
    loginToken: '',
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.USER_LOGIN_ACTION:
            return {
                ...state,
                loginToken: action.loginToken,
            }
        default:
            return state;
    }
};

export default reducer;