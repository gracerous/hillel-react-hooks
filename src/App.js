import { useEffect, useState } from 'react';
import UserList from './components/UserList';
import { Box, Container, Typography } from '@mui/material';



function App() {
  const [userList, setUserList] = useState([]);
  const [error, setError] = useState('');
  const [windowClick, setWindowClick] = useState(0)

  const URL = 'https://jsonplaceholder.typicode.com';

  useEffect(() => {
    const getUsersData = async () => {
      try {
        setError('');
        const response = await fetch(`${URL}/users`);
        if (!response.ok) {
          throw new Error('Failed to fetch');
        }
        const data = await response.json();
        setUserList(data);
      } catch (error) {
        setError(error.message);
      }
    };
    getUsersData();
  }, []);

  useEffect(() => {
    const handleWindowClick = () => {
      setWindowClick((prevCount) => prevCount + 1);
    };
    window.addEventListener('click', handleWindowClick);
    return () => {
      window.removeEventListener('click', handleWindowClick);
    };
  }, []);


  return (
    <>
      {error && <Typography variant='h1'>{error}</Typography>}
      <Typography variant="subtitle1"> Window clicks: {windowClick} </Typography>
      {userList.length > 0 &&
        <Container className='App'>
          <Box sx={{ width: 300 }}>
            <UserList data={userList} />
          </Box>
        </Container>}
    </>
  );
}

export default App;
