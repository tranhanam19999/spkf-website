import { Grid } from '@material-ui/core';
import { useState } from 'react';
import { notify } from 'utils/notify';
import { Gender } from 'view-model/chat';
import { DialogAction } from './action';
import { AgeSlider } from './age';
import styles from './dialog.module.css';
import { SelectGender } from './gender';

export const FilterDialog = (props) => {
    const { submitFilter } = props;

    const [gender, setGender] = useState(Gender.MALE);
    const [ageRange, setAgeRange] = useState([24, 30]);

    const onValidateFilters = () => {
        submitFilter('OK', {
            gender: gender,
            fromAge: ageRange[0],
            toAge: ageRange[1]
        });
    };

    const onCancelFilters = () => {
        onSubmitFilter('CANCEL');
    };

    return (
        <div className={styles.backdropWrapper}>
            <div className={styles.dialogWrapper}>
                <div className={styles.dialogContainer}>
                    <div className={styles.dialogHeaderWrapper}>
                        <span className={styles.dialogHeader}>Hãy chọn bộ lọc của bạn</span>
                    </div>
                    <div className={styles.dialogContentWrapper}>
                        <Grid container justifyContent="space-between">
                            <Grid item>
                                <SelectGender gender={gender} setGender={setGender} />
                            </Grid>
                            <Grid item>
                                <AgeSlider ageRange={ageRange} setAgeRange={setAgeRange} />
                                {/* <span>Chọn độ tuổi bạn muốn tìm kiếm</span>
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
                                </div> */}
                            </Grid>
                        </Grid>
                    </div>
                    <DialogAction
                        onValidateFilters={onValidateFilters}
                        onCancelFilters={onCancelFilters}
                    />
                </div>
            </div>
        </div>
    );
};
