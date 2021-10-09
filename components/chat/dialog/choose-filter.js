import { FormControlLabel, Grid, Radio, RadioGroup, TextField } from '@material-ui/core';
import { useState } from 'react';
import styles from '../chat.module.css';

export const DialogChooseFilter = ({ onSubmitFilter }) => {
    const [selectedGender, setSelectedGender] = useState('male');
    const [fromAge, setFromAge] = useState(18);
    const [toAge, setToAge] = useState(99);

    return (
        <div className={styles.dialogWrapper}>
            <div className={styles.dialogContainer}>
                <div className={styles.dialogHeaderWrapper}>
                    <span className={styles.dialogHeader}>Chọn bộ lọc</span>
                </div>
                <div className={styles.dialogContentWrapper}>
                    <Grid
                        container
                        alignItems="center"
                        justifyContent="space-between"
                        direction="column"
                    >
                        <Grid item>
                            <span>Chọn giới tính bạn muốn tìm kiếm</span>
                            <RadioGroup
                                value={selectedGender}
                                onChange={(e) => setSelectedGender(e.target.value)}
                                row
                            >
                                <FormControlLabel value="male" control={<Radio />} label="Nam" />
                                <FormControlLabel value="female" control={<Radio />} label="Nữ" />
                            </RadioGroup>
                        </Grid>
                        <Grid item>
                            <span>Chọn độ tuổi bạn muốn tìm kiếm</span>
                            <div className={styles.agesFieldWrapper}>
                                <TextField
                                    type="number"
                                    value={fromAge}
                                    placeholder={18}
                                    className={styles.ageField}
                                    variant="outlined"
                                />
                                <span className={styles.ageDivider}>-</span>
                                <TextField
                                    type="number"
                                    value={toAge}
                                    placeholder={99}
                                    className={styles.ageField}
                                    variant="outlined"
                                />
                            </div>
                        </Grid>
                    </Grid>
                </div>
                <div className={styles.dialogActionWrapper}>
                    <div className={styles.dialogActionContainer}></div>
                </div>
            </div>
        </div>
    );
};
