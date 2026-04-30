import express from 'express';
import authRoutes from './routes/authRoutes';
import loanRoutes from './routes/loanRoutes';
import cors from 'cors';

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// routes
app.use('/api/auth', authRoutes);
app.use('/api', loanRoutes);

// start server
app.listen(5000, () => {
  console.log('Server running on port 5000');
});