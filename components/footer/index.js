import styles from './footer.module.css';

export const Footer = ({footerWapperStyle}) => {
    return (
        <div className={`${styles.footerContainer} ${footerWapperStyle && footerWapperStyle}`}>
            <div>
                Product by <span style={{ fontWeight: 'bold' }}>Trần Hà Nam</span>
            </div>
            <div>HCMUTE 2021</div>
        </div>
    );
};
