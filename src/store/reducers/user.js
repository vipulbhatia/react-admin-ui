export const userReducer = (state={}, action) => {
    switch(action.type) {
        case 'USER_LOGIN': return {...state, loggedIn: true};
        default: return state;
    }
}
