import { FormControlLabel, Grid, Radio, RadioGroup, TextField } from '@material-ui/core';
import { CustomButton } from 'components/button';
import { useState } from 'react';
import { notify } from 'utils/notify';
import styles from '../chat.module.css';

export const DialogChooseFilter = ({ onSubmitFilter }) => {
    const [selectedGender, setSelectedGender] = useState('male');
    const [fromAge, setFromAge] = useState(18);
    const [toAge, setToAge] = useState(99);

    const submitFilters = () => {
        const validation = validateInfos();
        if (validation) {
            const data = {
                selectedGender,
                fromAge,
                toAge,
            };
            onSubmitFilter('OK', data);
        } else {
            notify.error('Khoảng cách tuổi không hợp lệ');
        }
    };

    const cancelFilters = () => {
        onSubmitFilter('CANCEL');
    };

    const validateInfos = () => {
        if (fromAge > toAge) {
            return;
        }
        return 'OK';
    };

    return (
        <div className={styles.backdropWrapper}>
            <div className={styles.dialogWrapper}>
                <div className={styles.dialogContainer}>
                    <div className={styles.dialogHeaderWrapper}>
                        <span className={styles.dialogHeader}>Chọn bộ lọc</span>
                    </div>
                    <div className={styles.dialogContentWrapper}>
                        <Grid container justifyContent="space-between" direction="column">
                            <Grid item>
                                <span>Chọn giới tính bạn muốn tìm kiếm</span>
                                <RadioGroup
                                    value={selectedGender}
                                    onChange={(e) => setSelectedGender(e.target.value)}
                                    row
                                >
                                    <FormControlLabel
                                        value="male"
                                        control={<Radio />}
                                        label="Nam"
                                    />
                                    <FormControlLabel
                                        value="female"
                                        control={<Radio />}
                                        label="Nữ"
                                    />
                                </RadioGroup>
                            </Grid>
                            <Grid item>
                                <span>Chọn độ tuổi bạn muốn tìm kiếm</span>
                                <div className={styles.agesFieldWrapper}>
                                    <TextField
                                        type="number"
                                        value={fromAge}
                                        onChange={(e) => setFromAge(e.target.value)}
                                        placeholder="18"
                                        className={styles.ageField}
                                        variant="outlined"
                                        inputProps={{ maxLength: 2 }}
                                        onInput={(e) => {
                                            e.target.value = Math.max(0, parseInt(e.target.value))
                                                .toString()
                                                .slice(0, 2);
                                        }}
                                    />
                                    <span className={styles.ageDivider}>-</span>
                                    <TextField
                                        type="number"
                                        value={toAge}
                                        onChange={(e) => setToAge(e.target.value)}
                                        placeholder="99"
                                        className={styles.ageField}
                                        variant="outlined"
                                        inputProps={{ maxLength: 2 }}
                                        onInput={(e) => {
                                            e.target.value = Math.max(0, parseInt(e.target.value))
                                                .toString()
                                                .slice(0, 2);
                                        }}
                                    />
                                </div>
                            </Grid>
                        </Grid>
                    </div>
                    <div className={styles.dialogActionWrapper}>
                        <div className={styles.dialogActionContainer}>
                            <CustomButton
                                onClick={submitFilters}
                                text="Chọn"
                                backgroundColor="blue"
                            />
                            <CustomButton
                                onClick={cancelFilters}
                                text="Hủy"
                                backgroundColor="red"
                            />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};
