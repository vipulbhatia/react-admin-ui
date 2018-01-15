export const userReducer = (state={}, action) => {
    switch(action.type) {
        case 'USER_LOGIN': return { ...state, jwt: action.payload };
        case 'USER_LOGOUT': return { ...state, jwt: undefined };
        default: return state;
    }
}
