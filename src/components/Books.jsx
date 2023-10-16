import {
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableRow,
    Paper,
} from '@mui/material';

const Books = (props) => {
    // if (!props.show) {
    //     return null;
    // }

    // const books = [];

    return (
        <div>
            <h2>books</h2>

            <TableContainer component={Paper}>
                <Table>
                    <TableBody>
                        <TableRow>
                            <TableCell></TableCell>
                            <TableCell>author</TableCell>
                            <TableCell>published</TableCell>
                        </TableRow>
                        {props.books.map((a) => (
                            <TableRow key={a.title}>
                                <TableCell>{a.title}</TableCell>
                                <TableCell>{a.author.name}</TableCell>
                                <TableCell>{a.published}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default Books;