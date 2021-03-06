import React, { useEffect, useState } from 'react';
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Grid,
    Menu,
    MenuItem,
} from '@material-ui/core';
import { useDispatch, useSelector } from 'react-redux';
import styles from './header.module.css';
import { useRouter } from 'next/router';
import { logoutUser } from '../../store/user/userSlice';
import { PATH } from 'utils/constant';

export const NavBar = ({login}) => {
    const dispatch = useDispatch();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const { user } = useSelector((state) => state.user);
    const isMenuOpen = Boolean(anchorEl);
    const router = useRouter();

    const handleRedirectHome = () => {
        router.push({
            pathname: '/home',
        });
    };

    const handleRedirect = (path) => {
        if (path) {
            router.push(path)
        }
        else if (user) {
            dispatch(logoutUser());
            router.push({
                pathname: '/login',
            });
        } else {
            router.push({
                pathname: '/login',
            });
        }
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const handleMenu = (event) => {
        setAnchorEl(event.currentTarget);
    };

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <>
            <Menu
                anchorEl={anchorEl}
                anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
                id={menuId}
                keepMounted
                transformOrigin={{ vertical: 'top', horizontal: 'right' }}
                open={isMenuOpen}
                onClose={handleClose}
            >
                {true ? (
                    <MenuItem>Logout</MenuItem>
                ) : (
                    <MenuItem onClick={handleClose}>Login</MenuItem>
                )}
            </Menu>
        </>
    );

    useEffect(() => {
    },[user])

    return (
        <div className={styles.grow}>
            <AppBar position="static" className={styles.appBar}>
                <Toolbar>
                    <Grid container item xs={8}>
                        <Grid item container xs={2} justifyContent="center" alignItems="center">
                            <Grid item xs={12} onClick={() => handleRedirectHome()}>
                                <Typography
                                    className={`${styles.title} ${styles.forumText}`}
                                    variant="h6"
                                    noWrap
                                >
                                    Forum
                                </Typography>
                                <Typography className={styles.title} variant="h6" noWrap>
                                    SPKF
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid item xs={10} className={styles.btnWapper}>
                            {!login && <>
                            <Button onClick={() => handleRedirect(PATH.TO_HOME)}>Di????n ??a??n</Button>
                            <Button onClick={() => handleRedirect(PATH.TO_HOME)}>Tha??nh vi??n</Button>
                            <Button onClick={() => handleRedirect(PATH.TO_CHAT)}>Chat ng????u nhi??n</Button>
                            </>}
                           
                        </Grid>
                    </Grid>
                    {!login &&
                        <Grid container item xs={4} justifyContent="flex-end" alignItems="center">
                            <Grid item xs={5} className={styles.btnWapper}>
                                <Button onClick={() => handleRedirect()}>
                                    {user ? `Hello ${user.username}, ????ng xu????t` : '????ng nh????p'}
                                </Button>
                            </Grid>
                        </Grid> 
                    }
                    
                </Toolbar>
            </AppBar>
        </div>
    );
};
