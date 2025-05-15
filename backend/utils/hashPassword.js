import bcrypt from 'bcryptjs';

const pepper = process.env.PEPPER

export const hashPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password + process.env.PEPPER, salt);
};
