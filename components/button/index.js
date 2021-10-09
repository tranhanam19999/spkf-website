import { makeStyles, Button, Badge } from '@material-ui/core';

const useStyles = makeStyles({
    button: (styledObj) => ({
        backgroundColor: styledObj.backgroundColor,
        padding: styledObj.padding,
        borderRadius: styledObj.borderRadius,
        fontStyle: 'normal',
        fontSize: styledObj.fontSize,
        lineHeight: styledObj.lineHeight,
        width: styledObj.width,
        color: styledObj.color,
        '&:hover': {
            backgroundColor: styledObj.backgroundColor,
        },
    }),
    badge: (styledObj) => ({
        '& .MuiBadge-colorPrimary': {
            color: styledObj.badgeColor,
            backgroundColor: styledObj.badgeBackgroundColor,
        },
        '& .MuiBadge-badge': {
            right: 7,
            top: 2,
            padding: '5px 4px',
        },
    }),
});

export const CustomButton = (props) => {
    const buttonStyle = {
        backgroundColor: '#8F8A8A',
        padding: '12px 32px',
        borderRadius: '16px',
        fontStyle: 'normal',
        fontSize: '12px',
        lineHeight: '16px',
        width: 'auto',
        color: '#fff',
        badgeColor: '#fff',
        badgeBackgroundColor: '#EC5A3A',
    };

    const customizeStyle = (styledObj) => {
        Object.keys(styledObj).forEach((key) => {
            if (styledObj[key]) {
                buttonStyle[key] = styledObj[key];
            }
        });
    };

    const { badgeNumber, text, onClick } = props;

    customizeStyle(props)
    const classes = useStyles(buttonStyle);

    return (
        <div>
            {badgeNumber ? (
                <Badge badgeContent={badgeNumber} color="primary" className={classes.badge}>
                    <Button onClick={onClick} className={classes.button}>
                        {text}
                    </Button>
                </Badge>
            ) : (
                <Button onClick={onClick} className={classes.button}>
                    {text}
                </Button>
            )}
        </div>
    );
};
