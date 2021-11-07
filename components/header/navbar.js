import React, { useEffect, useState } from 'react';
import {
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    Button,
    Grid,
    Menu,
    MenuItem,
} from '@material-ui/core';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faUser } from '@fortawesome/free-solid-svg-icons';
import { useDispatch, useSelector } from 'react-redux';
import styles from './header.module.css';
import { useRouter } from 'next/router';
import { logoutUser } from '../../store/user/userSlice';
import { PATH } from 'utils/constant';

export const NavBar = () => {
    const dispatch = useDispatch();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const { user } = useSelector((state) => state.user);
    const isMenuOpen = Boolean(anchorEl);
    const router = useRouter();

    const handleRedirectHome = () => {
        router.push({
            pathname: '/',
        });
    };

    const handleRedirect = (path) => {
        if (path) {
            router.push(path)
        }
        else if (user) {
            dispatch(logoutUser());
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
                            <Button onClick={() => handleRedirect(PATH.TO_HOME)}>Diễn đàn</Button>
                            <Button onClick={() => handleRedirect(PATH.TO_HOME)}>Thành viên</Button>
                            <Button onClick={() => handleRedirect(PATH.TO_CHAT)}>Chat ngẫu nhiên</Button>
                        </Grid>
                    </Grid>
                    <Grid container xs={4} justifyContent="flex-end" alignItems="center">
                        <Grid item xs={5} className={styles.btnWapper}>
                            <Button onClick={() => handleRedirect()}>
                                {user ? `Hello ${user.username}, Đăng xuẩt` : 'Đăng nhập'}
                            </Button>
                        </Grid>
                        {/* <Grid item xs={6}>
                            <IconButton
                                edge="end"
                                aria-label="account of current user"
                                aria-controls={'primary-search-account-menu'}
                                aria-haspopup="true"
                                onClick={() => handleMenu()}
                                color="inherit"
                            >
                            <FontAwesomeIcon icon={faUser} />
                            </IconButton>
                        </Grid> */}
                    </Grid>
                </Toolbar>
            </AppBar>
            {/* {renderMenu} */}
        </div>
    );
};
