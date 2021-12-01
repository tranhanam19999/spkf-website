import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { Grid, Typography, TextField, makeStyles, Box } from '@material-ui/core';
import styles from './header.module.css';
import {
    faChevronLeft,
    faPlus,
    faChevronDown,
    faSearch,
    faEnvelope,
    faPhoneAlt,
    faUser,
} from '@fortawesome/free-solid-svg-icons';
export const Header = () => {
    return (
        <>
            <div className={styles.topBar}>
                <Grid container>
                    <Grid item xs={6}>
                        <div className={styles.navbar-menu-left-side239}>
                            <ul>
                                <li>
                                    <a>
                                        <FontAwesomeIcon icon={faEnvelope} />
                                        Contact
                                    </a>
                                </li>
                                <li>
                                    <a>
                                        <FontAwesomeIcon icon={faPhoneAlt} />
                                        Support
                                    </a>
                                </li>
                                <li>
                                    <a>
                                        <FontAwesomeIcon icon={faUser} />
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </Grid>
                    <Grid item xs={6}>
                        <div className={styles.navbar-serch-right-side}>
                            <form role="search">
                                <div>
                                    <input
                                        placeholder="Search"
                                        id="srch-term"
                                        type="text"
                                    />
                                    <div class="input-group-btn">
                                        <button
                                            type="button"
                                        >
                                            <FontAwesomeIcon icon={faSearch} />
                                        </button>
                                    </div>
                                </div>
                            </form>
                        </div>
                    </Grid>
                </Grid>
            </div>
        </>
    );
};
