import {
    Dialog,
    DialogTitle,
    DialogContent,
    DialogContentText,
    DialogActions,
    Button,
} from '@material-ui/core';
import styles from './dialog.module.css'

export const ConfirmDialog = (props) => {
    const { openDialog, setOpenDialog, onConfirmed, text } = props;

    const handleClose = (type) => {
        setOpenDialog(false);
    };

    return (
        <Dialog
            open={openDialog}
            onClose={() => handleClose()}
        >
            <DialogTitle className={styles.dialogTitle}>Thông báo</DialogTitle>
            <DialogContent>
                <DialogContentText className={styles.textContent}>{text}</DialogContentText>
            </DialogContent>
            <DialogActions className={styles.dialogActionsWrapper}>
                <Button onClick={() => handleClose()} color="primary" className={styles.cancelBtn}>
                    Thoát
                </Button>
                <Button onClick={onConfirmed} color="primary" className={styles.confirmBtn}>
                    Đồng ý
                </Button>
            </DialogActions>
        </Dialog>
    );
};
