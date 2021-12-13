import { Button } from '@material-ui/core';
import styles from './action.module.css';

export const DialogAction = (props) => {
    const { onValidateFilters, onCancelFilters } = props;

    const validateFilter = () => {
        onValidateFilters();
    };

    const cancelFilters = () => {
        onCancelFilters();
    };

    return (
        <div className={styles.dialogActionWrapper}>
            <div className={styles.dialogActionContainer}>
                <Button variant="outlined" onClick={validateFilter}>
                    Lưu
                </Button>
                <Button variant="outlined" onClick={cancelFilters}>
                    Hủy
                </Button>
            </div>
        </div>
    );
};
