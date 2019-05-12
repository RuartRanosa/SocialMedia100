import axios from 'axios'

export const register = newUser => {
    return axios
        .post('/register', {
            username: newUser.username,
            name: newUser.name,
            email: newUser.email,
            password: newUser.password,
            birthday: newUser.birthday
        })
        .then(res => {
            return true
        })
        .catch(err => {
            return false
        })
}

export const login = user => {
    return axios
        .post('/login', {
            email: user.email,
            password: user.password
        })
        .then(res => {
            localStorage.setItem('usertoken', res.data)
            return true
        })
        .catch(err => {
            return false
        })
}
