import { getTokenFromHeader } from "../utils/getTokenFromHeader.js"
import { verifyToken } from "../utils/verifyToken.js";

export const isLoggedIn = (req, res, next) => {
    //get token from header
    const token = getTokenFromHeader(req);
    //verify the token
    const decodedUser = verifyToken(token);

    if(!decodedUser){
        throw new Error('Invalid/Expired token. Please login again');
    } else {
        //save the user into req object 
        req.userAuthId = decodedUser?.id;
        next();
    }
    
}