import jwt from "jsonwebtoken";

// Middleware for doctor authentication
const authDoctor = async (req, res, next) => {
    try {
        // Check for both lowercase and camelCase just in case
        const { dtoken, dToken } = req.headers;
        const token = dtoken || dToken;

        if (!token) {
            return res.json({ success: false, message: "Not Authorized, Login Again!" });
        }

        const token_decode = jwt.verify(token, process.env.JWT_SECRET);
        
        // Ensure the ID exists in the token
        if (!token_decode.id) {
             return res.json({ success: false, message: "Invalid Token, Login Again!" });
        }

        req.body.docId = token_decode.id;
        // Also attach to req.user or req.doctor for GET requests and general use
        req.doctor = { id: token_decode.id };
        next();
        
    } catch (error) {
        console.log("Auth Middleware Error:", error.message);
        res.json({ success: false, message: "Session Expired or Invalid Token" });
    }
};

export default authDoctor;