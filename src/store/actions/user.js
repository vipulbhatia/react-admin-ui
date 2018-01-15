export const login = (jwt) => ({
    type: 'USER_LOGIN',
    payload: jwt
});

export const logout = () => ({
    type: 'USER_LOGOUT'
})
