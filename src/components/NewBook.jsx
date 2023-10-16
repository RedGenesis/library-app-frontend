import { useState } from "react";
import { TextField, Button } from '@mui/material';
import { useMutation } from '@apollo/client';
import { ALL_BOOKS, CREATE_BOOK } from "../queries";

const NewBook = ({ setError }) => {
    const [title, setTitle] = useState('');
    const [author, setAuthor] = useState('');
    const [published, setPublished] = useState('');
    const [genre, setGenre] = useState('');
    const [genres, setGenres] = useState([]);

    // if (!props.show) {
    //     return null;
    // }

    const [ createBook ] = useMutation(CREATE_BOOK, {
        refetchQueries: [ { query: ALL_BOOKS } ],
        onError: (error) => {
            const messages = error.graphQLErrors.map(e =>
                e.message).join('/n');
            setError(messages);
        },
        // update: (cache, response) => {
        //     cache.updateQuery({ query: ALL_BOOKS }, ({ allBooks }) => {
        //         return {
        //             allBooks: allBooks.concat(response.data.addBook),
        //         }
        //     })
        // },
    });

    const submit = async (event) => {
        event.preventDefault();
        
        createBook({ variables:  { title, author, published, genres } });

        // console.log('add book...');

        setTitle('');
        setPublished('');
        setAuthor('');
        setGenres([]);
        setGenre('');
    }

    const addGenre = () => {
        setGenres(genres.concat(genre));
        setGenre('');
    }

    const genresStyle = {
        marginTop: 5,
        marginBottom: 5,
        fontSize: "1.125em"
    }

    return (
        <div>
            <form onSubmit={submit}>
                <div>
                    <TextField
                        label="title"
                        value={title}
                        onChange={({ target }) => setTitle(target.value)}
                    />
                </div>
                <div>
                    <TextField
                        label="author"
                        value={author}
                        onChange={({ target }) => setAuthor(target.value)}
                    />
                </div>
                <div>
                    <TextField
                        label="published"
                        value={published}
                        onChange={({ target }) => setPublished(Number(target.value))}
                    />
                </div>
                <div>
                    <TextField
                        label="genre"
                        value={genre}
                        onChange={({ target }) => setGenre(target.value)}
                    />
                    <Button
                        variant="contained"
                        color="primary"
                        type="button"
                        onClick={addGenre}
                    >
                        add genre
                    </Button>
                </div>
                <div style={genresStyle}>genres: {genres.join(' ')}</div>
                <Button variant="contained" color="primary" type="submit">
                    create book
                </Button>
            </form>
        </div>
    )
    // return (
    //     <div>
    //         <form onSubmit={submit}>
    //             <div>
    //                 title
    //                 <input
    //                     value={title}
    //                     onChange={({ target }) => setTitle(target.value)}
    //                 />
    //             </div>
    //             <div>
    //                 author
    //                 <input
    //                     value={author}
    //                     onChange={({ target }) => setAuthor(target.value)}
    //                 />
    //             </div>
    //             <div>
    //                 published
    //                 <input
    //                     value={published}
    //                     onChange={({ target }) => setPublished(target.value)}
    //                 />
    //             </div>
    //             <div>
    //                 genre
    //                 <input
    //                     value={genre}
    //                     onChange={({ target }) => setGenre(target.value)}
    //                 />
    //                 <button onClick={addGenre} type="button">
    //                     add genre
    //                 </button>
    //             </div>
    //             <div>genres: {genres.join(' ')}</div>
    //             <button type="submit">create book</button>
    //         </form>
    //     </div>
    // )
}

export default NewBook;