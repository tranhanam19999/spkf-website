import React from 'react';
import axios from 'axios';

const host = 'https://spkf-api.herokuapp.com/auth'

export const registerApi = (name, username, password) => {
    axios.post(`${host}/sign-up`, {
        fullName: name,
        username,
        password,
    })
    .then(res => {
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