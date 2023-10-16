import { useState, useEffect } from 'react';
import { TextField, Button } from '@mui/material';
import { useMutation } from '@apollo/client';
import { LOGIN } from '../queries';
import { useNavigate } from 'react-router-dom';

const LoginForm = ({ setError, setSuccess, setToken }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const [ login, result ] = useMutation(LOGIN, {
        onError: (error) => {
            setError(error.graphQLErrors[0].message);
        }
    });

    useEffect(() => {
        if (result.data) {
            const token = result.data.login.value;
            setToken(token);
            localStorage.setItem('library-user-token', token);
            setSuccess("Login Successful");
            navigate('/');
        }
    }, [result.data]);

    const submit = async (event) => {
        event.preventDefault();

        login({ variables: { username, password } });
    }
    
    return (
        <div>
            <form onSubmit={submit}>
                <div>
                    <TextField
                        label="username"
                        value={username}
                        onChange={({ target }) => setUsername(target.value)}
                    />
                </div>
                <div>
                    <TextField
                        type="password"
                        label="password"
                        value={password}
                        onChange={({ target }) => setPassword(target.value)}
                    />
                </div>
                <Button variant="contained" color="primary" type="submit">
                    login
                </Button>
            </form>
        </div>
    )
}

export default LoginForm;