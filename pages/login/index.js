import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { useRouter } from 'next/router';
import styles from './Login.module.css';
import { Button } from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, registerUser } from '../../store/user/userSlice';
import { loginApi } from '../../api/user';

export const loadingHome = async (ctx) => {
    let { loginInfo } = ctx.query;
    const props = {
        home: { a: 3 },
        isLogin: false,
    };
    const { res } = ctx;
    if (loginInfo) {
        const info = JSON.parse(loginInfo);
        if (info.email && info.pass) {
            try {
                const resLogin = await loginApi(info.email, info.pass);
                if (resLogin.data.code === 200) {
                    res.setHeader('set-cookie', [
                        `token=${resLogin.data.data.token}; Path=/; HttpOnly`,
                    ]);
                    props.isLogin = true;
                }
            } catch (e) {
                console.log(e.response);
            }
        }
    }
    return props;
};

export async function getServerSideProps(ctx) {
    let value = await loadingHome(ctx);
    const props = {
        ...value,
    };

    if(props.isLogin) {
        return {
            redirect: {
              destination: '/home',
              permanent: false,
            }
        }
    }

    return { props };
}

export const LoginPage = (props) => {
    const router = useRouter();
    const dispatch = useDispatch();
    const { user } = useSelector((state) => state.user);
    const [isRegister, setIsRegister] = useState(false);

    const loginForm = useForm();
    const submitForm = (form) => {
        let loginInfo = {
            email: form.email,
            pass: form.password,
        };

        router.push({
            pathname: '/login',
            query: {
                loginInfo: JSON.stringify(loginInfo),
            },
        });
    };

    const registerForm = useForm({ reValidateMode: 'onSubmit' });
    const register = (values) => {
        dispatch(registerUser(values.name, values.email, values.username, values.password));
    };

    useEffect(() => {
        if (user) {
            router.push({
                pathname: '/',
            });
        }
    }, [user]);

    return (
        <div className={styles.loginContainer}>
            <div>
                <div className={`${isRegister ? styles.hidden : ''}`}>
                    <div className={styles.title}>SPKF - Forum</div>
                    <form id="login-form" onSubmit={loginForm.handleSubmit(submitForm)}>
                        <input
                            className={styles.input}
                            name="email"
                            placeholder="Nh???p t??n ????ng nh???p"
                            {...loginForm.register('email')}
                        />
                        <input
                            type="password"
                            className={styles.input}
                            name="password"
                            placeholder="Nh???p m???t kh???u"
                            {...loginForm.register('password')}
                        />
                        <div className={styles.buttonWapper}>
                            <Button className={styles.loginButton} type="submit" form="login-form">
                                ????ng nh???p
                            </Button>
                            <a className={styles.btnRegister} onClick={() => setIsRegister(true)}>
                                Ta??o ta??i khoa??n
                            </a>
                        </div>
                    </form>
                </div>

                <div className={`${!isRegister ? styles.hidden : ''}`}>
                    <div className={styles.title}>SPKF - Forum</div>
                    <form id="register-form" onSubmit={registerForm.handleSubmit(register)}>
                        <input
                            className={styles.input}
                            name="name"
                            placeholder="Nh???p t??n"
                            {...registerForm.register('name', { required: true, minLength: 5 })}
                        />
                        <a
                            className={
                                registerForm.formState.errors.name ? styles.error : styles.hidden
                            }
                        >
                            {registerForm.formState.errors.name?.type === 'required'
                                ? 'Ch??a nh????p t??n'
                                : registerForm.formState.errors.name
                                ? '?????? da??i l????n h??n 5'
                                : ''}
                        </a>
                        <input
                            className={styles.input}
                            name="email"
                            placeholder="Nh???p email"
                            {...registerForm.register('email')}
                        />
                        <input
                            className={styles.input}
                            name="username"
                            placeholder="Nh???p t??n ????ng nh???p"
                            {...registerForm.register('username')}
                        />
                        <input
                            type="password"
                            className={styles.input}
                            name="password"
                            placeholder="Nh???p m???t kh???u"
                            {...registerForm.register('password')}
                        />
                        <div className={styles.buttonWapper}>
                            <Button className={styles.loginButton} type="submit" form="register-form">
                                ????ng ki??
                            </Button>
                            <a className={styles.btnRegister} onClick={() => setIsRegister(false)}>
                                ????ng nh????p
                            </a>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};
export default LoginPage;
