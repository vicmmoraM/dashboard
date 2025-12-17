import Alert from '@mui/material/Alert';
import Box from '@mui/material/Box';

interface AlertConfig {
    description: string;
}

export default function AlertConfig(config: AlertConfig) {
    return (
        <Box sx={{ mb: 2 }}>
            <Alert
                severity='info'
                sx={{
                    backgroundColor: '#e3f2fd',
                    color: '#0277bd',
                    border: '1px solid #90caf9',
                    borderRadius: 2,
                    '& .MuiAlert-icon': {
                        color: '#0288d1'
                    }
                }}
            >
                {config.description}
            </Alert>
        </Box>
    )
}