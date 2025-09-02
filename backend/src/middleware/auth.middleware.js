export const protectRoute = (req, res, next) => {
    try {
        const userId = req.auth.userId;
        if (!userId) {
            return res.status(401).json({ error: 'Unauthorized' });
        }
        next();
    } catch (error) {
        console.error('Error in authentication middleware:', error);
        res.status(500).json({ message: 'Internal Server Error' });
    }
};
// This middleware checks if the user is authenticated using Clerk
// It looks for the userId in req.auth, which is populated by the clerkMiddleware
// If the user is not authenticated, it responds with a 401 Unauthorized status
// If authenticated, it calls next() to proceed to the next middleware or route handler