import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import * as styles from '../login/Login.module.css';
import { Button } from '@material-ui/core';
import {useDispatch, useSelector} from 'react-redux'
import {loginUser, registerUser} from '../../store/user/userSlice';

export const LoginPage = () => {
    const router = useRouter()
    const dispatch = useDispatch()
    const {user} = useSelector(state=> state.user)
    const [isRegister, setIsRegister] = useState(false)

    // const { register, handleSubmit, errors } = useForm();
    const loginForm = useForm();
    const submitForm = (form) => {
        dispatch(loginUser(form.email, form.password));
        // router.push('/home')
    };

    const registerForm = useForm({reValidateMode: "onSubmit"});
    const register = (values) => {
        console.log("register",{...values});
        dispatch(registerUser(values.name, values.email, values.username, values.password));
    }
    
    useEffect(() => {
        if(user) {
            router.push({
                pathname: '/',
            })
        }
    },[user])

    return (
        <div className={styles.loginContainer}>
            <div>
                <div className={`${isRegister ? styles.hidden : ''}`}>
                    <div className={styles.title}>Log In</div>
                    <form id="login-form" onSubmit={loginForm.handleSubmit(submitForm)} >
                        <input
                            className={styles.input}
                            name="email"
                            placeholder="Enter email"
                            {...loginForm.register("email")}
                        />
                        <input
                            type="password"
                            className={styles.input}
                            name="password"
                            placeholder="Enter password"
                            {...loginForm.register("password")}
                        />
                        <div className={styles.buttonWapper}>
                            <Button id={styles.button} type="submit" form="login-form"> Đăng nhâp</Button>
                            <a className={styles.btnRegister} onClick={()=>setIsRegister(true)}> Tạo tài khoản</a>
                        </div>
                    </form>
                </div>

                <div className={`${!isRegister ? styles.hidden : ''}`}>
                    <div className={styles.title}>Sign up</div>
                    <form id="register-form" onSubmit={registerForm.handleSubmit(register)} >
                        <input
                            className={styles.input}
                            name="name"
                            placeholder="Enter your full name"
                            {...registerForm.register('name'
                                ,{ required: true, minLength: 5 }
                            )}
                        />
                        <a className = { registerForm.formState.errors.name ? styles.error : styles.hidden }>
                            {registerForm.formState.errors.name?.type === "required" ? "Chưa nhập tên" : registerForm.formState.errors.name ?  "Độ dài lớn hơn 5" : ""}
                        </a>
                        <input
                            className={styles.input}
                            name="email"
                            placeholder="Enter email"
                            {...registerForm.register("email")}
                        />
                         <input
                            className={styles.input}
                            name="username"
                            placeholder="Enter username"
                            {...registerForm.register("username")}
                        />
                        <input
                            type="password"
                            className={styles.input}
                            name="password"
                            placeholder="Enter password"
                            {...registerForm.register("password")}
                        />
                        <div className={styles.buttonWapper}>
                            <Button id={styles.button} type="submit" form="register-form"> Đăng kí</Button>
                            <a className={styles.btnRegister} onClick={()=>setIsRegister(false)}> Đăng nhập</a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
export default LoginPage;
