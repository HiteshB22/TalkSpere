import { generateStreamToken } from "../config/stream.js";
export const getStreamToken = (req, res) => {
    try {
        const userId = req.auth().userId;
        if (!userId) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        const token = generateStreamToken(userId);
        if (!token) {
            return res.status(500).json({ error: 'Failed to generate token' });
        }
        res.status(200).json({ token });
    } catch (error) {
        console.error('Error generating Stream token:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
}