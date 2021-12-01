import { CircularProgress, Box } from '@material-ui/core';

export const LoadingScreen = ({ position = 'absolute', top = '250px', size = 60 }) => {
    return (
        <div style={{ position: 'relative' }}>
            <Box
                sx={{ display: 'flex', width: '100%', justifyContent: 'center' }}
                style={{ position: position, top: top}}
            >
                <CircularProgress style={{ width: size, height: size }} />
            </Box>
        </div>
    );
};
