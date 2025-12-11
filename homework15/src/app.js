const express = require('express');
const ordersRouter = require('./routes/orders');
const logger = require('./middleware/logger');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(express.json());
app.use(logger);

app.use('/orders', ordersRouter);

app.get('/secret', (req, res) => {
  const token = req.headers['x-secret-token'];
  if (token !== 'open-sesame') {
    return res.status(401).json({ message: 'Unauthorized secret route' });
  }
  return res.json({ message: 'Secret route accessed' });
});

app.use((req, res) => {
  res.status(404).json({ message: 'Route not found' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});


