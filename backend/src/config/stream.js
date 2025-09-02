import { StreamChat } from 'stream-chat';
import { env } from './env.js';

export const StreamClient = StreamChat.getInstance(env.STREAM_API_KEY, env.STREAM_API_SECRET);

export const upsertSreamUser = async (userData) => {
    try {
        await StreamClient.upsertUser(userData);    
        console.log("Stream user upserted/created successfully:", userData.name);
        return userData;      
    } catch (error) {
        console.log("Error upserting/creating Stream user:", error);
    }
};

export const deleteStreamUser = async (userId) => {
    try {
        await StreamClient.deleteUser(userId);
        console.log("Stream user deleted successfully:", userId);
    } catch (error) {
        console.log("Error deleting Stream user:", error);
    }
}; 

export const generateStreamToken = (userId) => {
    try {
        return StreamClient.createToken(userId.toString());
    } catch (error) {
        console.log("Error generating Stream token:", error);
        return null;
    }
};
