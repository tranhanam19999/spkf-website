import { faInfoCircle } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { CustomButton } from "components/button";
import { color } from "utils/constant";
import styles from './header.module.css'

export const HeaderChat = (props) => {
    const { startChat } = props;

    return (
        <div className={styles.headerChatWrapper}>
            <div className={styles.headerChatContainer}>
                <span className={styles.headerChatTitle}>Chat ngẫu nhiên</span>
                <div className={styles.otherInfosHeaderWrapper}>
                    <CustomButton
                        text="Bắt đầu"
                        onClick={startChat}
                        backgroundColor={color.secondary}
                        color="#000"
                        borderRadius="unset"
                        fontSize="20px"
                        lineHeight="21px"
                        padding="12px 20px"
                    />
                    <FontAwesomeIcon
                        icon={faInfoCircle}
                        className={styles.informationIcon}
                    />
                </div>
            </div>
        </div>
    );
};
