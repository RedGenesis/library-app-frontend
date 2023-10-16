import { Alert } from '@mui/material';

const Notify = ({ errorMessage, successMessage }) => {
    if (!errorMessage && !successMessage) {
        return null;
    }

    if (errorMessage) {
        return (
            <Alert severity="error">{errorMessage}</Alert>
        )
    }
    
    if (successMessage) {
        return (
            <Alert severity="success">{successMessage}</Alert>    
        )
    }
}

export default Notify;