import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import * as styles from '../login/Login.module.css';
import { Button } from '@material-ui/core';

export const LoginPage = () => {
    const router = useRouter()

    const { register, handleSubmit, errors } = useForm();
    const submitForm = (values) => {
        console.log("alo",{...values});
        router.push('/home')
    };

    return (
        <div className={styles.loginContainer}>
            <div>
                <div>
                    <div className={styles.title}>Log In</div>
                    <div className={styles.description}>Hello there, Log In</div>
                    <form id="login-form" onSubmit={handleSubmit(submitForm)} >
                        <input
                            className={styles.input}
                            name="email"
                            placeholder="Enter email"
                            {...register("email")}
                        />
                        <input
                            type="password"
                            className={styles.input}
                            name="password"
                            placeholder="Enter password"
                            {...register("password")}
                        />
                        <div>
                            <Button id={styles.button} type="submit" form="login-form"> Submit</Button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
export default LoginPage;
