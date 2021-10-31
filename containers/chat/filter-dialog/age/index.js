import { Slider } from '@material-ui/core';
import { age, ageMarks, minAgeRange } from 'utils/constant';
import styles from './age.module.css';

export const AgeSlider = (props) => {
    const { ageRange, setAgeRange } = props;

    const onSliderChange = (_, newAgeRange, activeThumb) => {
        if (!Array.isArray(newAgeRange)) {
            return;
        }

        if (newAgeRange[1] - newAgeRange[0] < minAgeRange) {
            if (activeThumb === 0) {
                const clamped = Math.min(newAgeRange[0], 34 - minAgeRange);
                setAgeRange([clamped, clamped + minAgeRange]);
            } else {
                const clamped = Math.max(newAgeRange[1], minAgeRange);
                setAgeRange([clamped - minAgeRange, clamped]);
            }
        } else {
            setAgeRange(newAgeRange);
        }
    };

    return (
        <div className={styles.ageSliderWrapper}>
            <span>Độ tuổi</span>
            <Slider
                value={ageRange}
                onChange={onSliderChange}
                valueLabelDisplay="on"
                marks={ageMarks}
                min={age.min}
                max={age.max}
                className={styles.sliderAgeRange}
            />
        </div>
    );
};
