import {
    AppBar,
    Toolbar,
    IconButton,
    Typography,
    InputBase,
    Button,
    Grid,
    makeStyles,
    alpha,
    Menu,
    MenuItem,
} from '@material-ui/core';
import {
    grayColor,
    whiteColor,
    hexToRgb,
    blackColor,
    backGroundColor,
} from '../../assets/material-dashboard-react';

const useStyles = makeStyles((theme) => ({
    appBar: {
        color: whiteColor,
        backgroundColor: grayColor[2],
    },
    grow: {
        flexGrow: 1,
    },
    menuButton: {
        marginLeft: theme.spacing(1),
    },
    title: {
        display: 'block',
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: alpha(theme.palette.common.white, 0.15),
        '&:hover': {
            backgroundColor: alpha(theme.palette.common.white, 0.25),
        },
        marginRight: theme.spacing(2),
        marginLeft: 0,
        width: '100%',
        [theme.breakpoints.up('sm')]: {
            marginLeft: theme.spacing(3),
            width: 'auto',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputRoot: {
        color: 'inherit',
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        transition: theme.transitions.create('width'),
        width: '100%',
        [theme.breakpoints.up('md')]: {
            width: '20ch',
        },
    },
    sectionDesktop: {
        display: 'none',
        [theme.breakpoints.up('md')]: {
            display: 'flex',
        },
    },
    sectionMobile: {
        display: 'flex',
        [theme.breakpoints.up('md')]: {
            display: 'none',
        },
    },
    button: {
        margin: theme.spacing(1),
        fontSize: '12px',
        fontWeight: '400',
        cursor: 'pointer',
        '&:hover': {
            color: backGroundColor,
            backgroundColor: grayColor[0],
        },
        '&:hover,&:focus': {
            color: backGroundColor,
            // boxShadow:
            //     '0 14px 26px -12px rgba(' +
            //     hexToRgb(grayColor[0]) +
            //     ', 0.42), 0 4px 23px 0px rgba(' +
            //     hexToRgb(blackColor) +
            //     ', 0.12), 0 8px 10px -5px rgba(' +
            //     hexToRgb(grayColor[0]) +
            //     ', 0.2)',
        },
    },
    buttonFocus: {
        margin: theme.spacing(1),
        fontSize: '12px',
        fontWeight: '400',
        cursor: 'pointer',
        color: backGroundColor,
    },
}));

export const NavBar = () => {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const isMenuOpen = Boolean(anchorEl);

    const handleMenuClose = () => {
        setAnchorEl(null);
    };

    const menuId = 'primary-search-account-menu';
    const renderMenu = (
        <Menu
            anchorEl={anchorEl}
            anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
            id={menuId}
            keepMounted
            transformOrigin={{ vertical: 'top', horizontal: 'right' }}
            open={isMenuOpen}
            onClose={handleMenuClose}
        >
            {true ? (
                <MenuItem >Logout</MenuItem>
            ) : (
                <MenuItem onClick={handleMenuClose}>Login</MenuItem>
            )}
        </Menu>
    );

    return (
        <div className={classes.grow}>
            <AppBar position="static" className={classes.appBar}>
                <Toolbar>
                    <Grid container item xs={8}>
                        <Grid item container xs={2} justifyContent="center" alignItems="center">
                            <Grid item xs={12}>
                                <Typography className={classes.title} variant="h6" noWrap>
                                    Material-UI
                                </Typography>
                            </Grid>
                        </Grid>
                        <Grid item xs={10}>
                            <Button className={classes.button} color="inherit">
                                Detail
                            </Button>
                            <Button className={classes.button} color="inherit">
                                User managers
                            </Button>
                        </Grid>
                    </Grid>
                </Toolbar>
            </AppBar>
            {renderMenu}
        </div>
    );
};
