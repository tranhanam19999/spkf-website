import { IconButton } from "@material-ui/core"
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"

export const IconBtn = (props) => {
    const { icon, onIconClicked, color, style } = props

    return (
        <IconButton onClick={() => !!onIconClicked} className={style ? style : ''}>
            <FontAwesomeIcon icon={icon} color={color ? color : "#4A4848"} />
        </IconButton>
    )
}
