import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { ALL_AUTHORS, SET_BIRTHYEAR } from '../queries';

import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Paper,
    TextField,
    Button,
    FormControl,
    InputLabel,
    Select,
    MenuItem
} from '@mui/material';

const Authors = (props) => {
    // if (!props.show) {
    //     return null;
    // }
    // const authors = [];
    const [name, setName] = useState('');
    const [born, setBorn] = useState('');

    const [setBirthYear] = useMutation(SET_BIRTHYEAR, {
        refetchQueries: [ { query: ALL_AUTHORS } ]
    });

    const submit = async (event) => {
        event.preventDefault();

        setBirthYear({ variables: { name, born } });

        setName('');
        setBorn('');
    }

    return (
        <div>
            <h2>authors</h2>
            <TableContainer component={Paper}>
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell></TableCell>
                            <TableCell>born</TableCell>
                            <TableCell>books</TableCell>
                        </TableRow>
                        {props.authors.map((a) => (
                            <TableRow key={a.name}>
                                <TableCell>{a.name}</TableCell>
                                <TableCell>{a.born}</TableCell>
                                <TableCell>{a.bookCount}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
            {props.token && 
            <div><h3>Set birthyear</h3>
            <form onSubmit={submit}>
                <div>
                    {/* <TextField
                        label="name"
                        value={name}
                        onChange={({ target }) => setName(target.value)}
                    /> */}
                    <FormControl fullWidth>
                        <InputLabel>Select Author</InputLabel>
                        <Select
                            value={name}
                            label="name"
                            onChange={({ target }) => setName(target.value)}
                        >
                        {props.authors.map((a) => (
                            <MenuItem key={a.name} value={a.name}>{a.name}</MenuItem>
                        ))}
                        </Select>
                    </FormControl>
                </div>
                <div>
                    <TextField
                        label="born"
                        value={born}
                        onChange={({ target }) => setBorn(Number(target.value))}
                    />
                </div>
                <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                >
                    update author
                </Button>
            </form></div>}
        </div>
    )
}

export default Authors;