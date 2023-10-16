import { useQuery, useApolloClient } from '@apollo/client';
import { useState, useEffect } from 'react'

import Authors from './components/Authors';
import Books from './components/Books';
import NewBook from './components/NewBook';
import Notify from './components/Notify';
import LoginForm from './components/LoginForm';
import { ALL_BOOKS, ALL_AUTHORS } from './queries';
import {
  Routes, Route, Link,
  useNavigate,
  Navigate,
} from 'react-router-dom';
import {
  Container,
  AppBar,
  Toolbar,
  Button
} from '@mui/material';
// import reactLogo from './assets/react.svg'
// import viteLogo from '/vite.svg'
// import './App.css'

const App = () => {
  const result = useQuery(ALL_BOOKS);
  const result2 = useQuery(ALL_AUTHORS);
  // const [page, setPage] = useState('authors');
  const [errorMessage, setErrorMessage] = useState(null);
  const [successMessage, setSuccessMessage] = useState(null);
  const [token, setToken] = useState(null);
  const client = useApolloClient();
  const navigate = useNavigate();

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('library-user-token');
    if (loggedUserJSON) {
      setToken(loggedUserJSON);
    }
  }, [])

  if (result.loading || result2.loading) {
    return <div>loading...</div>
  }

  const notifyError = (message) => {
    setErrorMessage(message);
    setTimeout(() => {
      setErrorMessage(null);
    }, 10000);
  }
  
  const notifySuccess = (message) => {
    setSuccessMessage(message);
    setTimeout(() => {
      setSuccessMessage(null);
    }, 10000);
  }

  const logout = () => {
    setToken(null);
    localStorage.clear();
    client.resetStore();
    navigate('/login');
  }

  const padding = {
    padding: 5
  }

  const width = {
    maxWidth: "500px"
  }

  return (
    <Container style={width}>
      <AppBar position="static">
        <Toolbar>
          <Button color="inherit" component={Link} to="/">
            authors
          </Button>
          <Button color="inherit" component={Link} to="/books">
            books
          </Button>
          {token && <Button color="inherit" component={Link} to="/add">
            add books
          </Button> }
          {!token && <Button color="inherit" component={Link} to="/login">
            login
          </Button> }
          {token && <Button color="inherit" onClick={logout}>
            logout
          </Button> }
        </Toolbar>
      </AppBar>
      <Notify errorMessage={errorMessage} successMessage={successMessage} />
      {/* <div>
        <Link style={padding} to="/">authors</Link>
        <Link style={padding} to="/books">books</Link>
        <Link style={padding} to="/add">add book</Link>
      </div> */}
      <Routes>
        <Route path="/" element={<Authors authors={result2.data.allAuthors} token={token} />} />
        <Route path="/books" element={<Books books={result.data.allBooks} />} />
        <Route path="/add" element={<NewBook setError={notifyError} />} />
        <Route
          path="/login"
          element={
            <LoginForm
              setError={notifyError}
              setToken={setToken}
              setSuccess={notifySuccess}
            />
          }
        />
      </Routes>
    </Container>
  )
  // return (
  //   <div>
  //     <div>
  //       <button onClick={() => setPage('authors')}>authors</button>
  //       <button onClick={() => setPage('books')}>books</button>
  //       <button onClick={() => setPage('add')}>add book</button>
  //     </div>

  //     <Authors show={page === 'authors'} authors={result2.data.allAuthors}/>

  //     <Books show={page === 'books'} books={result.data.allBooks}/>
      
  //     <NewBook show={page === 'add'} />
  //   </div>
  // )
}

export default App
