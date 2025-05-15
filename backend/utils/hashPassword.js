import bcrypt from 'bcryptjs';
import crypto from 'crypto';

const pepper = process.env.PEPPER

export const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password + process.env.PEPPER, salt);
};
export const sha256Hash = (password) => {
    return crypto.createHash('sha256').update(password + process.env.PEPPER).digest('hex');
  };