import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import { env } from './config/env.js';
const app = express();
const PORT = env.PORT;
app.use(cors());

app.use(express.json());

app.get('/', (req, res) => {
    res.send('Hello, World!');
});

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
    connectDB();
});
