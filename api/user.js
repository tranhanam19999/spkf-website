import React from 'react';
import axios from 'axios';

const host = 'https://spkf-api.herokuapp.com/auth';
const userHost = 'https://spkf-api.herokuapp.com/user';
// const host = 'http://192.168.1.36:4000/auth'

export const registerApi = (name, email, username, password) => {
    try {
        return axios
            .post(`${host}/sign-up`, {
                fullName: name,
                email,
                username,
                password,
            })
            .then((res) => {
                return res;
            });
    } catch (err) {
        return err.response;
    }
};

export const loginApi = (username, password) => {
    try {
        return axios
            .post(`${host}/sign-in`, {
                username: username,
                password: password,
            })
            .then((res) => {
                return res;
            });
    } catch (err) {
        return err.response;
    }
};

export const getUserInfoApi = (userId, token) => {
    try {
        return axios.get(`${userHost}`, {
            params: { userId },
            headers: { Authorization: `${token}` },
        });
    } catch (err) {
        return err.response;
    }
};

export const getUserBytokenApi = (token) => {
    try {
        return axios.get(`${userHost}`, {
            params: { token },
            headers: { Authorization: `${token}` },
        });
    } catch (err) {
        return err.response;
    }
};
