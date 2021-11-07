import { MenuItem, Select } from '@material-ui/core';
import { Gender, GenderLabel } from 'view-model/chat';
import styles from './gender.module.css';

export const SelectGender = (props) => {
    const { gender, setGender } = props;

    const handleChangeGender = (e) => {
        setGender(e.target.value);
    };

    return (
        <div>
            <span>Giới tính</span>
            <span className={styles.genderSelectWrapper}>
                <Select value={gender} onChange={handleChangeGender} className={styles.genderSelectContainer}>
                    <MenuItem value={Gender.MALE}>{GenderLabel[Gender.MALE]}</MenuItem>
                    <MenuItem value={Gender.FEMALE}>{GenderLabel[Gender.FEMALE]}</MenuItem>
                </Select>
            </span>
        </div>
    );
};
