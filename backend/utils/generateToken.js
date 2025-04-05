import jwt from 'jsonwebtoken';
import 'dotenv/config';

const generateToken = (id) => {
    return jwt.sign({id}, process.env.JWT_KEY, {expiresIn: '3d'});
}

export default generateToken;