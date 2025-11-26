import Alert from '@mui/material/Alert';

interface AlertConfig{
    description: string;
}

export default function AlertConfig(config:AlertConfig){
    return(
        <Alert variant='outlined' severity='success'>{config.description}</Alert>
    )
}