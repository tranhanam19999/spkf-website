import styles from './button.module.css';

export const ListButton = (props) => {
    const { listBtn, styleButton } = props;
    return (
        <div className={styles.inboundFilterButtonContainer}>
            {listBtn.map((item, index) => {
                return (
                    <div
                        className={styleButton ? styleButton : styles.customButtonContainer}
                        key={index}
                    >
                        {item}
                    </div>
                );
            })}
        </div>
    );
};
