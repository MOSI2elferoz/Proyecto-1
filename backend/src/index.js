const express = require('express');
const cors = require('cors');
require('dotenv').config();

const { sequelize } = require('./models');

const app = express();

app.use(cors());
app.use(express.json());

// Routes
const userRoutes = require('./routes/users');
const projectRoutes = require('./routes/projects');
const taskRoutes = require('./routes/tasks');

app.use('/api/users', userRoutes);
app.use('/api/projects', projectRoutes);
app.use('/api/tasks', taskRoutes);

app.get('/', (req, res) => {
  res.send('Project Management API is running...');
});

const PORT = process.env.PORT || 5000;

// Sync DB and start server
sequelize.sync({ alter: true }).then(() => {
  console.log('Database synced');
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}).catch(err => {
  console.error('Failed to sync database:', err);
});
