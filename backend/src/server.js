import express from 'express';
import cors from 'cors';
import { connectDB } from './config/db.js';
import { env } from './config/env.js';
import { clerkMiddleware } from '@clerk/express'//
import {inngest,functions} from './config/inngest.js'//
import {serve} from 'inngest/express'//
import chatRoutes from './routes/chat.route.js';//

const app = express();
app.use(cors());
app.use(clerkMiddleware());//--req.auth is populated by this middleware
app.use(express.json());

const PORT = env.PORT;
//to ignore favicon requests in logs
app.get('/favicon.ico', (req, res) => res.status(204).end());

app.get('/', (req, res) => {
    res.send('welcome to talkspace backend !!');
});

app.use("api/inngest",serve({client: inngest, functions}));//--
app.use("api/chat",chatRoutes);

const startServer = async () => {
    try {
        await connectDB();
        if(env.NODE_ENV !== 'production'){
            app.listen(PORT, () => {
            console.log(`Server is running on port ${PORT}`);
        });
        }
        
    } catch (error) {
        console.error('Failed to start server:', error);
        process.exit(1);
    }
};
startServer();

export default app;
