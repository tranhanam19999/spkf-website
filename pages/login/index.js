import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as styles from '../login/Login.module.css';

export const LoginPage = () => {
    const { register, handleSubmit, errors } = useForm();
    const submitForm = (values) => {
        console.log("alo",{...values});
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
                            <button className={styles.button} type="submit" form="login-form"> Submit</button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
export default LoginPage;
