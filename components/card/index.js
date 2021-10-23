import styles from './card.module.css';

export function MyCardHeader({ title, children, style, titleStyle }) {
    return (
        <div
            className={style ? style : styles.headerCardWapper}
        >
            <span
                style={{
                    fontSize: '18px',
                    fontWeight: '600',
                    lineHeight: '28px',
                    width: '100%',
                    ...(titleStyle || {}),
                }}
            >
                {title}
            </span>
            {children && <div style={{ textAlign: 'right', width: '100%' }}>{children}</div>}
        </div>
    );
}
