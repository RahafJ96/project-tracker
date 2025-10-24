import express from 'express';
import cors from 'cors';
import dotenv from "dotenv";

// import { router as projectRoutes  } from './routes/projects';


const app = express();
app.use(cors());
app.use(express.json());

dotenv.config();


// Routes
// app.use('/api/projects', projectRoutes);
// app.use('/api/auth', authRoutes);

app.get('/health', (_req, res) => {
    res.status(200).send('API is running 🚀');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});


export default app;
