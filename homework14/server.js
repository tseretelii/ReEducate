const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());

let users = [];
let nextId = 1;

const validateUser = (req, res, next) => {
  const { name, age } = req.body;
  
  if (!name || name.trim() === '') {
    return res.status(400).json({ error: 'Name is required' });
  }
  
  if (age === undefined || age === null) {
    return res.status(400).json({ error: 'Age is required' });
  }
  
  if (typeof age !== 'number' || age < 0) {
    return res.status(400).json({ error: 'Age must be a positive number' });
  }
  
  next();
};


app.get('/users', (req, res) => {
  let filteredUsers = [...users];
  
  const ageFilter = req.query.age;
  if (ageFilter === 'older') {
    filteredUsers = filteredUsers.filter(user => user.age > 30);
  } else if (ageFilter === 'younger') {
    filteredUsers = filteredUsers.filter(user => user.age < 10);
  }
  
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const startIndex = (page - 1) * limit;
  const endIndex = page * limit;
  
  const paginatedUsers = filteredUsers.slice(startIndex, endIndex);
  
  res.json({
    users: paginatedUsers,
    pagination: {
      page,
      limit,
      total: filteredUsers.length,
      totalPages: Math.ceil(filteredUsers.length / limit)
    }
  });
});

app.get('/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const user = users.find(u => u.id === id);
  
  if (!user) {
    return res.status(404).json({ error: 'User not found' });
  }
  
  res.json(user);
});

app.post('/users', validateUser, (req, res) => {
  const { name, age, email, eyecolor } = req.body;
  
  const newUser = {
    id: nextId++,
    name: name.trim(),
    age,
    ...(email && { email }),
    ...(eyecolor && { eyecolor })
  };
  
  users.push(newUser);
  res.status(201).json(newUser);
});

app.put('/users/:id', validateUser, (req, res) => {
  const id = parseInt(req.params.id);
  const userIndex = users.findIndex(u => u.id === id);
  
  if (userIndex === -1) {
    return res.status(404).json({ error: 'User not found' });
  }
  
  const { name, age, email, eyecolor } = req.body;
  
  users[userIndex] = {
    id,
    name: name.trim(),
    age,
    ...(email && { email }),
    ...(eyecolor && { eyecolor })
  };
  
  res.json(users[userIndex]);
});

app.delete('/users/:id', (req, res) => {
  const id = parseInt(req.params.id);
  const userIndex = users.findIndex(u => u.id === id);
  
  if (userIndex === -1) {
    return res.status(404).json({ error: 'User not found' });
  }
  
  const deletedUser = users.splice(userIndex, 1)[0];
  res.json({ message: 'User deleted successfully', user: deletedUser });
});

app.get('/secret', (req, res) => {
  res.json({ 
    message: 'This is a secret route!',
    secret: 'You found the hidden endpoint!'
  });
});

app.use((req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

