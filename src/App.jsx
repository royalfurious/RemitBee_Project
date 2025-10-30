import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, TextField, Typography, Box, Grid, Card, CardContent, Avatar } from '@mui/material';

function App() {
  const [users, setUsers] = useState([]);
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  useEffect(() => {
    axios.get('https://jsonplaceholder.typicode.com/users')
      .then(response => {
        setUsers(response.data);
        setFilteredUsers(response.data);
      })
      .catch(error => console.error('Error fetching users:', error));
  }, []);

  useEffect(() => {
    const filtered = users.filter(user =>
      user.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredUsers(filtered);
  }, [searchTerm, users]);

  return (
    <Container maxWidth="lg" sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom align="center">
        User Directory
      </Typography>
      <Box sx={{ mb: 4 }}>
        <TextField
          fullWidth
          label="Search by name"
          variant="outlined"
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
      </Box>
      <Grid container spacing={3}>
        {filteredUsers.map(user => (
          <Grid item xs={12} sm={6} md={4} key={user.id}>
            <Card sx={{ height: '100%' }}>
              <CardContent>
                <Box display="flex" alignItems="center" mb={2}>
                  <Avatar sx={{ mr: 2 }}>{user.name.charAt(0)}</Avatar>
                  <Typography variant="h6">{user.name}</Typography>
                </Box>
                <Typography variant="body2" color="text.secondary">
                  Email: {user.email}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Phone: {user.phone}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Website: {user.website}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Company: {user.company.name}
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Container>
  );
}

export default App;
