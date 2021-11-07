import React from 'react';
import axios from 'axios';

const host = 'https://spkf-api.herokuapp.com/auth'
// const host = 'http://192.168.1.36:4000/auth'

export const registerApi = (name, email, username, password) => {
    console.log('registerApi', name, email, username, password)
    return axios.post(`${host}/sign-up`, {
        fullName: name,
        email,
        username,
        password,
    })
    .then(res => {
        console.log('registerApi',res)
        return res
    })
}

export const loginApi = (username, password) => {
    return axios.post(`${host}/sign-in`, {
        username: username,
        password: password,
    })
    .then(res => {
        return res
    })
}
